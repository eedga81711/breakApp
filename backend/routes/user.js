const express = require("express");
const router = express.Router();

const {
  createUser,
  deleteUser,
  editUser,
  fetchAllUsers,
  loginUser,
} = require("../controllers/user-controller");

const { hashPassword, authenticateToken } = require("../middlewares/user");

/*userRole Route */
router.get("/", function (req, res) {
  res.json({ message: "users route accessed" });
});

/* createUser Route. */
router.post("/createUser", createUser);

/* deleteUser Route. */
router.delete("/deleteUser", deleteUser);

/* editUser Route. */
router.patch("/editUser", editUser);

/* fetchAllUser Route. */
router.get("/all", fetchAllUsers);

//FIXME: THIS IS COMMENTED BUT USEFUL
// /* loginUser Route. */
// router.get("/login", authenticateToken, loginUser);

// /* setPassword Route. */
// router.post("/setPassword", hashPassword, authenticateToken, setUserPassword);

module.exports = router;
