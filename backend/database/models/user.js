"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email must be unique",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Please enter a valid email address",
          },
          notNull: {
            args: true,
            msg: "email must not be empty",
          },
        },
      },
      company: {
        type: DataTypes.ENUM("Odyssey", "Upti"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["Odyssey", "Upti"]],
            msg: "Invalid Company Name",
          },
        },
      },
      userType: {
        type: DataTypes.ENUM("SuperAdmin", "Admin", "User"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["SuperAdmin", "Admin", "User"]],
            msg: "Invalid UserType",
          },
        },
      },
      status: {
        type: DataTypes.ENUM("Active", "Inactive", "Suspended"),
        allowNull: false,
        defaultValue: "Active",
        validate: {
          isIn: {
            args: [["Active", "Inactive", "Suspended"]],
            msg: "Invalid Status",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};
