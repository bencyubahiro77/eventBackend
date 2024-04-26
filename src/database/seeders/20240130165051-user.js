'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',
      [
        {
          username: 'admin',
          email: 'admin@service.com',
          role: 'Admin',
          password: 'Password@123',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'benjamin',
          email: 'ben@service.com',
          role: 'Attender',
          password: 'password@123',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Users', null, {});
   
  }
};
