const jwt = require("jsonwebtoken");

async function generateToken({ username, _id, time_card }) {
  const payload = { username, _id, time_card };
  return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: "12hr",
  });
}

module.exports = generateToken;
