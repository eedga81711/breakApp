const jwt = require("jsonwebtoken");
require("dotenv").config();

function loginToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.decode(token);
    const userRole = decoded.userRole;

    let jwtSecret;
    switch (userRole) {
      case "User":
        jwtSecret = process.env.JWT_SECRET_USER;
        break;
      case "Admin":
        jwtSecret = process.env.JWT_SECRET_ADMIN;
        break;
      case "SuperAdmin":
        jwtSecret = process.env.JWT_SECRET_SUPER;
        break;
      default:
        return res.status(500).json({ error: "Invalid user role" });
    }

    const verifiedToken = jwt.verify(token, jwtSecret);

    req.user = verifiedToken;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = {
  loginToken,
};
