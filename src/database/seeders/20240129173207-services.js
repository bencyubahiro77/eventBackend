'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Services',
   [
    {
      title: "Meddy Concert",
      date: new Date(), 
      location: "Amahoro Stadium",
      ticketAvailability: 1200, 
      CategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Basketball Game",
      date: new Date(), 
      location: "Nyamirambo Stadium",
      ticketAvailability: 800, 
      CategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Buying furnitures",
      date: new Date(), 
      location: "Furniture showroom",
      ticketAvailability: 50, 
      CategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ]
   )
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('Services', null, {});
    
  }
};
