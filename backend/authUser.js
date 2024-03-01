const { User } = require("./database/models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function authenticateToken(req, res, next) {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ where: { name } });

    if (!user) {
      return res.status(404).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userRole = user.userType;

    let jwtSecret;

    const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
    const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
    const JWT_SECRET_SUPER = process.env.JWT_SECRET_SUPER;

    if (!JWT_SECRET_USER || !JWT_SECRET_ADMIN || !JWT_SECRET_SUPER) {
      return res
        .status(500)
        .json({ error: "JWT secret keys are not provided" });
    }

    switch (userRole) {
      case "User":
        jwtSecret = JWT_SECRET_USER;
        break;
      case "Admin":
        jwtSecret = JWT_SECRET_ADMIN;
        break;
      case "SuperAdmin":
        jwtSecret = JWT_SECRET_SUPER;
        break;
      default:
        return res.status(500).json({ error: "Invalid user role" });
    }

    switch (userRole) {
      case "User":
        jwtSecret = JWT_SECRET_USER;
        redirectUrl = "/User/home";
        break;
      case "Admin":
      case "SuperAdmin":
        jwtSecret = userRole === "Admin" ? JWT_SECRET_ADMIN : JWT_SECRET_SUPER;
        redirectUrl = "/Admin/Dashboard";
        break;
      default:
        return res.status(500).json({ error: "Invalid user role" });
    }

    const jwtToken = jwt.sign(
      { name: user.name, password: user.password, userRole: user.userType },
      jwtSecret
    );

    res.json({ message: "Welcome Back User!", token: jwtToken, redirectUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  authenticateToken,
};

// const { User } = require("./database/models");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// async function authenticateToken(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: "Token not provided" });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Retrieve user information based on the decoded token
//     const user = await User.findOne({ where: { name: decoded.name } });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Optionally, you can also verify the user's password or any other checks here

//     // Attach the user object to the request for further processing
//     req.user = user;

//     // Proceed to the next middleware
//     next();
//   } catch (error) {
//     return res.status(403).json({ error: "Invalid token" });
//   }
// }

// module.exports = {
//   authenticateToken,
// };
