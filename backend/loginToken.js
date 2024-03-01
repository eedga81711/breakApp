// const { User } = require("./database/models");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// async function loginToken(req, res, next) {
//   const { name, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { name } });

//     if (!user) {
//       return res.status(404).json({ message: "Incorrect name or password" });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Incorrect name or password" });
//     }

//     const userRole = user.userType;

//     let jwtSecret;

//     const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
//     const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
//     const JWT_SECRET_SUPER = process.env.JWT_SECRET_SUPER;

//     if (!JWT_SECRET_USER || !JWT_SECRET_ADMIN || !JWT_SECRET_SUPER) {
//       return res
//         .status(500)
//         .json({ error: "JWT secret keys are not provided" });
//     }

//     switch (userRole) {
//       case "User":
//         jwtSecret = JWT_SECRET_USER;
//         break;
//       case "Admin":
//         jwtSecret = JWT_SECRET_ADMIN;
//         break;
//       case "SuperAdmin":
//         jwtSecret = JWT_SECRET_SUPER;
//         break;
//       default:
//         return res.status(500).json({ error: "Invalid user role" });
//     }

//     const jwtToken = jwt.sign(
//       {
//         name: user.name,
//         userRole: user.userType,
//         userId: user.userId,
//       },
//       jwtSecret
//     );

//     res.json({
//       message: "Login successful",
//       token: jwtToken,
//       redirectUrl: userRole === "User" ? "/User/home" : "/Admin/Dashboard",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

// module.exports = {
//   loginToken,
// };

const jwt = require("jsonwebtoken");
require("dotenv").config();

function loginToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

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
