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
        lastName: 'Lasfirr',
        email: 'demo2@user.io',
        username: 'Demo-lition2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Trina',
        lastName: 'Pine',
        email: 'user12@user.io',
        username: 'NotAFakeUser12',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Hazel',
        lastName: 'Forest',
        email: 'user22@user.io',
        username: 'AlsoNotAFakeUser22',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Birch',
        lastName: 'Twig',
        email: 'arborist@user.io',
        username: 'Willow',
        hashedPassword: bcrypt.hashSync('password'),

      },
      {
        firstName: 'Sequoia',
        lastName: 'Cone',
        email: 'treeclimber@user.io',
        username: 'Cedar',
        hashedPassword: bcrypt.hashSync('password') 
      },
      {
        firstName: 'Aspen',
        lastName: 'Bark',
        email: 'forester@user.io',
        username: 'ElmWood',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
