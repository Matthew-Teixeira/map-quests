const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protected = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.data._id).select("-password");

      next();
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = protected;
