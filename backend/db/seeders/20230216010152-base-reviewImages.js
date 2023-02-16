'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'greatPic.jpg',
      },
      {
        reviewId: 2,
        url: 'goodPic.jpg',
      },
      {
        reviewId: 3,
        url: 'okPic.jpg',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
 
  }
};