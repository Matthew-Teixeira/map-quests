const { User, Token, TimeCard } = require("../models/index");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-__v -password");
    res.status(200).json(users);
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};

const getMe = async (req, res) => {
  try {
    if (!req.user) {
      res.status(404);
      throw new Error("User could not be found");
    }
    res.send(req.user);
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = await User.findById(userId)
      .populate("time_card")
      .select("-__v -password");
    if (!foundUser) {
      res.status(404);
      throw new Error("User Not Found");
    }
    //const userTimeCard = await TimeCard.findById
    res.status(200).json(foundUser);
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPass } = req.body;

    console.log(username, email, password, confirmPass);

    if (!username || !email || !password || !confirmPass) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    if (password !== confirmPass) {
      res.status(400);
      throw new Error("Passwords do not match");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already registered");
    }

    const newUser = await User.create(req.body);

    if (!newUser) {
      res.status(400);
      throw new Error("Invalid user data");
    }

    const userTimeCard = await TimeCard.create({ user: newUser._id });
    await User.findByIdAndUpdate(newUser._id, { time_card: userTimeCard._id });

    const token = await generateToken(newUser);

    res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      password: newUser.password,
      token
    });
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(404);
      throw new Error("Incorrect credentials");
    }

    const correctPassword = await foundUser.isCorrectPassword(password);

    if (!correctPassword) {
      res.status(400);
      throw new Error("Incorrect credentials");
    }

    const token = await generateToken(foundUser);

    res.status(201).json({
      _id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      token
    });
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};

async function logoutUser(req, res) {
  try {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0), // expires now
      sameSite: "none",
      secure: true
    });
    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    res.json({
      error: error.message
    });
  }
}

async function updateUser(req, res) {
  try {
    const { _id } = req.user._id;
    const body = req.body;

    const updatedUser = await User.findByIdAndUpdate(_id, body, {
      new: true
    }).select("-__v -password");

    if (!updatedUser) {
      throw new Error("User could not be found");
    }

    res.send(updatedUser);
  } catch (error) {
    res.json({
      error: error.message
    });
  }
}

async function changePassword(req, res) {
  try {
    const user = await User.findById(req.user._id).select("-__v");
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    if (newPassword !== confirmPassword) {
      res.status(400);
      throw new Error("Passwords don't match");
    }

    /*  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!passwordIsCorrect) {
      res.status(400);
      throw new Error("Current password is incorrect");
    } */

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Changed password" });
  } catch (error) {
    res.json({
      error: error.message
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(
      { _id: userId },
      { new: true }
    );
    if (!deletedUser) {
      res.status(404);
      throw new Error("User could not be found");
    }
    res.status(200).json({ message: "Delete User", deleted: deletedUser });
  } catch (error) {
    res.json({
      error: error.message
    });
  }
}

async function loginStatus(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }

    const varified = jwt.verify(token, process.env.JWT_SECRET);
    if (varified) {
      return res.json(true);
    }
    return res.json(false);
  } catch (error) {
    res.json({
      error: error.message
    });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("Not a valid user email");
    }

    // Delete token if exits in DB for user
    let token = await Token.findOne({ userId: user._id });

    if (token) await Token.deleteOne({ _id: token._id });

    // Create Reset Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

    // Hash token to and save to db
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save token to user in DB
    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000) // 30 minutes
    }).save();

    // Construct reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    // Reset Email
    const message = `
    <h2>Hello ${user.username}</h2>
    <p>You have requested a password reset.</p>
    <p>The reset link is valid for 30 minutes.</p>
    <p>Please use the link to reset your password.</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    <p>Thank you,</p>
    <p>AppSolo Tech.</p>
    `;

    const subject = `Password Reset Request`;
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    await sendEmail(subject, message, send_to, sent_from);

    res.status(200).json({ success: true, message: "Reset email sent" });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message
    });
  }
}

async function resetPassword(req, res) {
  try {
    const { resetToken } = req.params;
    const { newPassword, confirmPassword } = req.body;
    console.log(newPassword, confirmPassword);
    if (!newPassword || !confirmPassword) {
      throw new Error("No Data");
    } else if (newPassword !== confirmPassword) {
      throw new Error("Passwords don't match");
    }

    // Hash resetToken from link then compare it to DB token

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Get DB token
    const dbToken = await Token.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() }
    });

    console.log(dbToken);

    if (!dbToken) {
      throw new Error("Invalid or expired reset token");
    }

    // Find user
    const user = await User.findOne({ _id: dbToken.userId });

    user.password = newPassword;
    await user.save();

    res.status(201).json({
      error: false,
      success: true,
      message: "Password reset successful. Please login."
    });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message,
      stack: error.stack
    });
  }
}

module.exports = {
  getUsers,
  getMe,
  getOneUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  changePassword,
  deleteUser,
  loginStatus,
  forgotPassword,
  resetPassword
};
