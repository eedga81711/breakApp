const express = require("express");
const router = express.Router();

const {
  createOrder,
  deleteOrder,
  editOrder,
  fetchAllOrders,
} = require("../controllers/order-controller");

const {} = require("../middlewares/order");

/* createOrder Route. */
router.post("/createOrder", createOrder);

/* deleteOrder Route. */
router.delete("/deleteOrder", deleteOrder);

/* editOrder Route. */
router.patch("/editOrder", editOrder);

/* fetchAllOrder Route. */
router.get("/", fetchAllOrders);

module.exports = router;
