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
    let dataCategory = JSON.parse(fs.readFileSync("./data/category.json", "utf-8"));
    dataCategory.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
   });
   return queryInterface.bulkInsert("Categories", dataCategory, {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Categories", null, {});
  }
};
