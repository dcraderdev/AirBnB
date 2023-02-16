'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.changeColumn('ReviewImages','createdAt',{
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },options),

    // await queryInterface.changeColumn('ReviewImages','updatedAt',{
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },options);
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.changeColumn('ReviewImages','createdAt',{
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },options),

    // await queryInterface.changeColumn('ReviewImages','updatedAt',{
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },options);
  },
};
