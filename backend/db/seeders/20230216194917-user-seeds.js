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
        firstName: 'Simple',
        lastName: 'User',
        email: 'simple@gmail.com',
        username: 'simpleUser',
        hashedPassword: bcrypt.hashSync('simplepassword')
      },
      {
        firstName: 'Easy',
        lastName: 'User',
        email: 'easy@gmail.com',
        username: 'easyUser',
        hashedPassword: bcrypt.hashSync('easypassword')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@gmail.com',
        username: 'demoUser',
        hashedPassword: bcrypt.hashSync('demopassword')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
