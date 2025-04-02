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
        id: 1, // Smartphones
        brands: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"]
      },
      {
        id: 2, // Laptops
        brands: ["Dell", "HP", "Apple", "Asus", "Lenovo"]
      },
      {
        id: 3, // Smartwatches
        brands: ["Apple", "Samsung", "Garmin", "Fitbit", "Fossil"]
      },
      {
        id: 4, // Headphones
        brands: ["Sony", "Bose", "Sennheiser", "JBL", "Beats"]
      },
      {
        id: 5, // Gaming Consoles
        brands: ["Sony PlayStation", "Microsoft Xbox", "Nintendo"]
      },
      {
        id: 6, // Men's Clothing
        brands: ["Nike", "Adidas", "Puma", "Levi's", "Zara"]
      },
      {
        id: 7, // Women's Clothing
        brands: ["H&M", "Forever 21", "Gucci", "Prada", "Zara"]
      },
      {
        id: 8, // Footwear
        brands: ["Nike", "Adidas", "Puma", "Reebok", "Vans"]
      },
      {
        id: 9, // Accessories
        brands: ["Ray-Ban", "Fossil", "Michael Kors", "Casio", "Rolex"]
      },
      {
        id: 10, // Bags & Wallets
        brands: ["Gucci", "Louis Vuitton", "Coach", "Hermès", "Prada"]
      },
      {
        id: 11, // Furniture
        brands: ["IKEA", "Ashley Furniture", "Wayfair", "West Elm", "Herman Miller"]
      },
      {
        id: 12, // Kitchen Appliances
        brands: ["Philips", "KitchenAid", "Breville", "Cuisinart", "Samsung"]
      },
      {
        id: 13, // Home Decor
        brands: ["IKEA", "West Elm", "Pottery Barn", "Wayfair", "Crate & Barrel"]
      },
      {
        id: 14, // Bedding & Mattresses
        brands: ["Tempur-Pedic", "Serta", "Sealy", "Casper", "Purple"]
      },
      {
        id: 15, // Storage & Organization
        brands: ["IKEA", "Rubbermaid", "The Container Store", "Sterilite", "ClosetMaid"]
      },
      {
        id: 16, // Skincare
        brands: ["The Ordinary", "CeraVe", "Neutrogena", "La Roche-Posay", "Clinique"]
      },
      {
        id: 17, // Makeup
        brands: ["MAC", "Maybelline", "Fenty Beauty", "Dior", "Sephora"]
      },
      {
        id: 18, // Hair Care
        brands: ["L'Oreal", "Pantene", "Redken", "Olaplex", "Tresemmé"]
      },
      {
        id: 19, // Fragrances
        brands: ["Chanel", "Dior", "Versace", "Tom Ford", "YSL"]
      },
      {
        id: 20, // Grooming Kits
        brands: ["Philips", "Braun", "Gillette", "Remington", "Bevel"]
      },
      {
        id: 21, // Gym Equipment
        brands: ["Bowflex", "Peloton", "NordicTrack", "Rogue Fitness", "Life Fitness"]
      },
      {
        id: 22, // Camping Gear
        brands: ["Coleman", "The North Face", "REI", "MSR", "Osprey"]
      },
      {
        id: 23, // Bicycles
        brands: ["Trek", "Giant", "Specialized", "Cannondale", "Scott"]
      },
      {
        id: 24, // Sportswear
        brands: ["Nike", "Adidas", "Under Armour", "Puma", "New Balance"]
      },
      {
        id: 25, // Footwear
        brands: ["Nike", "Adidas", "Puma", "Reebok", "Vans"]
      }
    ];
    
    for (var subCategory of productCategories) {
      for (var brand of subCategory.brands) {
        await queryInterface.bulkInsert('CategoryType3s', [{
          name: brand,
          createdAt: new Date(),
          updatedAt: new Date(),
          type_2: subCategory.id
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

    await queryInterface.bulkDelete('CategoryType3s', null, {})
  }
};
