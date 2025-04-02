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

    const categories = [
      "Electronics",
      "Fashion",
      "Home & Kitchen",
      "Beauty & Personal Care",
      "Sports & Outdoor"
    ]

    for (var type of categories) {
      await queryInterface.bulkInsert('CategoryType1s', [{
        name: type,
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

    await queryInterface.bulkDelete('CategoryType1s', null, {})
  }
};
