'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const colors = ["blue", "red", "yellow", "purple", "green", "orange", "black", "white"]
    const size = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const packages = ['small', 'medium', 'large']
    
    for (var c of colors) {
      await queryInterface.bulkInsert('TipeSubVariants', [{
        name: c,
        variant_id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }])
    }

    for (var s of size) {
      await queryInterface.bulkInsert('TipeSubVariants', [{
        name: s,
        variant_id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      }])
    }

    for (var p of packages) {
      await queryInterface.bulkInsert('TipeSubVariants', [{
        name: p,
        variant_id: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      }])
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('TipeSubVariants', null, {});
  }
};
