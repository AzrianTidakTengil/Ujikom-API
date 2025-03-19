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

    // await queryInterface.addColumn('Deliveries', 'name', { type: Sequelize.STRING})
    await queryInterface.removeColumn('Deliveries', 'name')
    await queryInterface.addColumn('Deliveries', 'user_id', { type: Sequelize.STRING})
    await queryInterface.addColumn('Deliveries', 'type_label', { type: Sequelize.STRING})
    
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
