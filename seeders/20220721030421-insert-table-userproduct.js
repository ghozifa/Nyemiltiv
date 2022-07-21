'use strict';
const fs = require("fs");

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let dataUserProduct = JSON.parse(fs.readFileSync("./data/userproducts.json", "utf-8"));
    dataUserProduct.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
   });
   return queryInterface.bulkInsert("UserProducts", dataUserProduct, {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("UserProducts", null, {});
  }
};
