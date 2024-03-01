"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      dateOfOrder: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      debt: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isMax(value) {
            if (value > 1000) {
              throw new Error("Debt must be less than or equal to 1000.");
            }
          },
        },
      },
      status: {
        type: DataTypes.ENUM("Declined", "Pending", "Served"),
        defaultValue: "Pending",
        allowNull: false,
        validate: {
          isIn: {
            args: [["Declined", "Pending", "Served"]],
            msg: "Invalid Status",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: true,
    }
  );
  return Order;
};
