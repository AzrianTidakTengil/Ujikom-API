'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      method_id: {
        type: Sequelize.STRING
      },
      subtotal: {
        type: Sequelize.INTEGER
      },
      coupon_payment: {
        type: Sequelize.INTEGER
      },
      fare: {
        type: Sequelize.INTEGER
      },
      coupon_fare: {
        type: Sequelize.INTEGER
      },
      insurance: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};