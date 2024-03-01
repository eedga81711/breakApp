"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isPositive(value) {
            if (value <= 0) {
              throw new Error("Price value must be a positive integer.");
            }
          },
        },
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: true,
    }
  );
  return Product;
};
