'use strict';

/** @type {import('sequelize-cli').Migration} */
const { QueryInterface } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options,[
        {
          spotId: 1,
          userId: 2,
          startDate: new Date('2023-02-10'),
          endDate: new Date('2023-02-12'),
        },
      ],{}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, {}, {});
  },
};
