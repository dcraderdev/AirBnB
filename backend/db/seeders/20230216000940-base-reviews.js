'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 3,
        spotId: 1,
        review: 'Great stay',
        stars: 2
      },
      {
        userId: 3,
        spotId: 1,
        review: 'Good stay',
        stars: 3
      },
      {
        userId: 3,
        spotId: 2,
        review: 'Poor stay',
        stars: 4
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
 
  }
};