const jwt = require("jsonwebtoken");
require("dotenv").config();

function loginToken(req, res, next) {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = {
  loginToken,
};
