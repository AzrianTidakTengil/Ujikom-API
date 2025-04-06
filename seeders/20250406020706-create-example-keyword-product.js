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

    const kataKunciPencarian = [
      // Umum
      "laptop di bawah 10 juta",
      "laptop di bawah 10 juta",
      "laptop di bawah 10 juta",
      "laptop di bawah 10 juta",
      "headset bluetooth tanpa kabel",
      "headset bluetooth tanpa kabel",
      "produk skincare organik",
      "produk skincare organik",
      "produk skincare organik",
      "sepatu lari pria",
      "sepatu lari pria",
      "sepatu lari pria",
      "sepatu lari pria",
      "meja kerja minimalis",
      "meja kerja minimalis",
      "meja kerja minimalis",
    
      // Fashion
      "dress wanita musim panas",
      "dress wanita musim panas",
      "dress wanita musim panas",
      "dress wanita musim panas",
      "dress wanita musim panas",
      "jaket kulit hitam pria",
      "jaket kulit hitam pria",
      "jaket kulit hitam pria",
      "jaket kulit hitam pria",
      "jaket kulit hitam pria",
      "jaket kulit hitam pria",
      "jaket kulit hitam pria",
      "jaket kulit hitam pria",
      "jaket kulit hitam pria",
      "jaket kulit hitam pria",
      "hoodie oversize",
      "hoodie oversize",
      "hoodie oversize",
      "hoodie oversize",
      "hoodie oversize",
      "hoodie oversize",
      "hoodie oversize",
      "baju musim dingin anak",
      "baju musim dingin anak",
      "baju musim dingin anak",
      "baju musim dingin anak",
      "pakaian olahraga ukuran besar",
      "pakaian olahraga ukuran besar",
      "pakaian olahraga ukuran besar",
    
      // Elektronik
      "casing iPhone 15",
      "casing iPhone 15",
      "casing iPhone 15",
      "laptop gaming RTX 4060",
      "laptop gaming RTX 4060",
      "laptop gaming RTX 4060",
      "laptop gaming RTX 4060",
      "laptop gaming RTX 4060",
      "laptop gaming RTX 4060",
      "laptop gaming RTX 4060",
      "laptop gaming RTX 4060",
      "laptop gaming RTX 4060",
      "laptop gaming RTX 4060",
      "earphone noise cancelling",
      "earphone noise cancelling",
      "earphone noise cancelling",
      "earphone noise cancelling",
      "earphone noise cancelling",
      "smart TV 55 inci 4K",
      "smart TV 55 inci 4K",
      "smart TV 55 inci 4K",
      "charger nirkabel berdiri",
      "charger nirkabel berdiri",
      "charger nirkabel berdiri",
    
      // Rumah & Dekorasi
      "meja kopi minimalis",
      "meja kopi minimalis",
      "lampu LED kamar tidur",
      "air fryer kapasitas besar",
      "rak penyimpanan dapur",
      "lampu lantai modern",
    
      // Kecantikan
      "lipstik cruelty free",
      "lipstik cruelty free",
      "lipstik cruelty free",
      "lipstik cruelty free",
      "serum wajah melembapkan",
      "serum wajah melembapkan",
      "serum wajah melembapkan",
      "serum wajah melembapkan",
      "minyak jenggot pria",
      "minyak jenggot pria",
      "paket skincare Korea",
      "paket skincare Korea",
      "paket skincare Korea",
      "paket skincare Korea",
      "paket skincare Korea",
      "paket skincare Korea",
      "paket skincare Korea",
      "paket skincare Korea",
      "sunscreen SPF 50",
    
      // Gaming
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "kontroler PlayStation 5",
      "keyboard gaming RGB",
      "keyboard gaming RGB",
      "keyboard gaming RGB",
      "keyboard gaming RGB",
      "keyboard gaming RGB",
      "keyboard gaming RGB",
      "keyboard gaming RGB",
      "keyboard gaming RGB",
      "keyboard gaming RGB",
      "keyboard gaming RGB",
      "keyboard gaming RGB",
      "aksesoris Nintendo Switch",
      "aksesoris Nintendo Switch",
      "aksesoris Nintendo Switch",
      "aksesoris Nintendo Switch",
      "aksesoris Nintendo Switch",
      "aksesoris Nintendo Switch",
      "kursi gaming ergonomis",
      "kursi gaming ergonomis",
      "kursi gaming ergonomis",
      "kursi gaming ergonomis",
      "kursi gaming ergonomis",
      "kursi gaming ergonomis",
      "kursi gaming ergonomis",
      "kursi gaming ergonomis",
      "kursi gaming ergonomis",
      "kursi gaming ergonomis",
      "kursi gaming ergonomis",
      "kursi gaming ergonomis",
      "headset VR untuk PC"
    ];

    for (var keyword of kataKunciPencarian) {
      await queryInterface.bulkInsert('KeywordProducts', [{
        label: keyword,
        user_id: null,
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

    await queryInterface.bulkDelete('KeywordProducts', null, {});
  }
};
