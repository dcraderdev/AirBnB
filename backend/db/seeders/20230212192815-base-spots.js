'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}




module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: 'Demo-road',
        city: 'Demo-town',
        state: 'Demo-fornia',
        country: 'Demo-states',
        lat: 8675309,
        lng: 8675309,
        name: 'Demo-cottage',
        description: 'Nice lil Demo-rental',
        price: 350,
      },
      {
        ownerId: 1,
        address: 'Demo-road',
        city: 'Demo-town',
        state: 'Demo-fornia',
        country: 'Demo-states',
        lat: 8675310,
        lng: 8675311,
        name: 'Demo-cottage 2',
        description: 'Nice lil Demo-rental',
        price: 360,
      },
      {
        ownerId: 1,
        address: 'Demo-road',
        city: 'Demo-town',
        state: 'Demo-fornia',
        country: 'Demo-states',
        lat: 8675312,
        lng: 8675313,
        name: 'Demo-cottage 3',
        description: 'Nice lil Demo-rental',
        price: 370,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: ['1'] }
    }, {});
  }

};
