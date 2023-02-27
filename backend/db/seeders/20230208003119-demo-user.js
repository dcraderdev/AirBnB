'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = { 
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Doug',
        firstName: 'Lasfirr',
        email: 'demo2@user.io',
        username: 'Demo-lition2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Trina',
        firstName: 'Pine',
        email: 'user12@user.io',
        username: 'FakeUser12',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Hazel',
        firstName: 'Forest',
        email: 'user22@user.io',
        username: 'FakeUser22',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
