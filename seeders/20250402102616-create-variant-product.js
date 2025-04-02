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

    const variants = [
      'color',
      'size',
      'package'
    ]

    for (var variant of variants) {
      await queryInterface.bulkInsert('TipeVariants', [{
        name: variant,
        shop_id: null,
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

    await queryInterface.bulkDelete('TipeVariants', null, {})
  }
};
