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

    const productCategories = [
      {
        id: 1,
        name: "Electronics",
        subcategories: [
          "Smartphones",
          "Laptops",
          "Smartwatches",
          "Headphones",
          "Gaming Consoles"
        ]
      },
      {
        id: 2,
        name: "Fashion",
        subcategories: [
          "Men's Clothing",
          "Women's Clothing",
          "Footwear",
          "Accessories",
          "Bags & Wallets"
        ]
      },
      {
        id: 3,
        name: "Home & Kitchen",
        subcategories: [
          "Furniture",
          "Kitchen Appliances",
          "Home Decor",
          "Bedding & Mattresses",
          "Storage & Organization"
        ]
      },
      {
        id: 4,
        name: "Beauty & Personal Care",
        subcategories: [
          "Skincare",
          "Makeup",
          "Hair Care",
          "Fragrances",
          "Grooming Kits"
        ]
      },
      {
        id: 5,
        name: "Sports & Outdoor",
        subcategories: [
          "Gym Equipment",
          "Camping Gear",
          "Bicycles",
          "Sportswear",
          "Footwear"
        ]
      }
    ]
    
    for (var type of productCategories) {
      for (var subcategory of type.subcategories) {
        await queryInterface.bulkInsert('CategoryType2s', [{
          name: subcategory,
          createdAt: new Date(),
          updatedAt: new Date(),
          type_1: type.id
        }])
      }
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('CategoryType2s', null, {})

  }
};
