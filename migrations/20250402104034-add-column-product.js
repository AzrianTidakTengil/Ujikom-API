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

    await queryInterface.addColumn('Produtcs', 'length', {type: Sequelize.INTEGER})
    await queryInterface.addColumn('Produtcs', 'width', {type: Sequelize.INTEGER})
    await queryInterface.addColumn('Produtcs', 'height', {type: Sequelize.INTEGER})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('Produtcs', 'length')
    await queryInterface.removeColumn('Produtcs', 'width')
    await queryInterface.removeColumn('Produtcs', 'height')
  }
};
