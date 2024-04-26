'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Categories',
   [
    {
      CategoryName: "Football",
      createdAt: new Date(),
      updatedAt:new Date()
    },
    {
      CategoryName: "Music",
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ]
   )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories',null,{});
  }
};
