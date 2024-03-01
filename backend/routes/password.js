const express = require("express");
const router = express.Router();

const { hashPassword, authenticateToken } = require("../middlewares/user");

/*password Route */
router.get("/", function (req, res) {
  res.json({ message: "password route accessed" });
});

/* setPassword Route. */
router.post("/set_password", hashPassword);

/* resetPassword Route. */
router.post("/reset_password", hashPassword, authenticateToken);

/* changePassword Route. */
router.post("/changePassword", hashPassword, authenticateToken);

module.exports = router;
