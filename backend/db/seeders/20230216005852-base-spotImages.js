'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'mainPic.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'housePic.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'frontPic.jpg',
        preview: true
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
 
  }
};