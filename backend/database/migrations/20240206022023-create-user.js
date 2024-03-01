"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      profilePicture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company: {
        type: Sequelize.ENUM("Odyssey", "Upti"),
        allowNull: false,
      },
      userType: {
        type: Sequelize.ENUM("SuperAdmin", "Admin", "User"),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive", "Suspended"),
        allowNull: false,
        defaultValue: "Active",
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
