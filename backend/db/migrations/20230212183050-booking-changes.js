'use strict';


/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  async up (queryInterface, Sequelize) {


    // await queryInterface.addColumn('Bookings','spotId', { 
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references:{
    //     model: 'Spots'
    //   },
    //   onDelete: 'cascade'
    // });

    // await queryInterface.addColumn('Bookings','userId', { 
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references:{
    //     model: 'Users',
    //   } 
    // });

 

  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Bookings', 'spotId');
    // await queryInterface.removeColumn('Bookings', 'userId');
  }
};
