'use strict';
const fs = require("fs");

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let dataUser = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    dataUser.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    return queryInterface.bulkInsert("Users", dataUser, {});
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  }
};
