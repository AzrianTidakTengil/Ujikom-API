'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // queryInterface.removeColumn('Payments', 'method_id')
    // queryInterface.removeColumn('Payments', 'subtotal')
    // queryInterface.removeColumn('Payments', 'coupon_payment')
    // queryInterface.removeColumn('Payments', 'fare')
    // queryInterface.removeColumn('Payments', 'coupon_fare')
    // queryInterface.removeColumn('Payments', 'insurance')
    // queryInterface.removeColumn('Payments', 'createdAt')
    // queryInterface.removeColumn('Payments', 'updatedAt')
    // queryInterface.addColumn('Payments', 'order_id', { type: Sequelize.STRING, allowNull: false })
    // queryInterface.addColumn('Payments', 'payment_method', { type: Sequelize.STRING, allowNull: false })
    // queryInterface.addColumn('Payments', 'type', { type: Sequelize.STRING })
    // queryInterface.addColumn('Payments', 'payment_code', { type: Sequelize.STRING, allowNull: false })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
