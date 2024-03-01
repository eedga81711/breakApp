const { Order, Sequelize, sequelize } = require("../database/models");

// create new order
async function createOrder(req, res) {
  try {
    const order = await Order.create(req.body);
    return res.status(201).send({ order });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// get all orders
async function fetchAllOrders(req, res) {
  try {
    const orders = await Order.findAll();
    return res.status(200).send({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// delete a order
async function deleteOrder(req, res, next) {
  try {
    const orderId = req.query.id;

    const order = await Order.findOne({ where: { id: orderId } });
    if (order) {
      await order.destroy();
      return res.status(202).send(`order id: ${orderId} deleted successfully`);
    } else {
      return res.status(404).send(`order id: ${orderId} not found`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// edit a order
async function editOrder(req, res, next) {
  try {
    const orderId = parseInt(req.query.id);

    const editedData = req.body;

    const [editedRows] = await Order.update(editedData, {
      where: { id: orderId },
    });

    const editedOrder = await Order.findOne({ where: { id: orderId } });

    if (editedRows === 0) {
      return res.status(304).send(`order id: ${orderId} not changed`);
    } else {
      return res.status(202).send({
        message: `order id: ${orderId} updated successfully`,
        order: editedOrder,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
}

module.exports = {
  createOrder,
  deleteOrder,
  editOrder,
  fetchAllOrders,
};
