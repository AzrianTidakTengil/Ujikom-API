'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WorkOperations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      store_id: {
        type: Sequelize.STRING
      },
      monday: {
        type: Sequelize.STRING
      },
      tuesday: {
        type: Sequelize.STRING
      },
      weknesday: {
        type: Sequelize.STRING
      },
      thursday: {
        type: Sequelize.STRING
      },
      friday: {
        type: Sequelize.STRING
      },
      saturday: {
        type: Sequelize.STRING
      },
      sunday: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('WorkOperations');
  }
};