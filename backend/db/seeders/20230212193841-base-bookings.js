'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-02-10',
        endDate: '2023-02-12'
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-03-10',
        endDate: '2023-03-12'
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-04-10',
        endDate: '2023-04-12'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: ['1'] }
    }, {});
 
  }
};
