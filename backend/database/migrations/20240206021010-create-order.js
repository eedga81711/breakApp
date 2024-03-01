"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      orderId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dateOfOrder: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      debt: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("Declined", "Pending", "Served"),
        defaultValue: "Pending",
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
    await queryInterface.dropTable("orders");
  },
};
