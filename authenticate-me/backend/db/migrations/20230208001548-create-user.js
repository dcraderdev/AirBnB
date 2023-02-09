'use strict';
/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName:{
        type: Sequelize.STRING(30)
      },
      lastName:{
        type: Sequelize.STRING(30)
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options)


    // .then(() => {
    //   return queryInterface.addIndex("Users", {
    //     fields: ["username"],
    //     unique: true,
    //     name: "username_unique_index",
    //   });
    // })
    // .then(() => {
    //   return queryInterface.addIndex("Users", {
    //     fields: ["email"],
    //     unique: true,
    //     name: "email_unique_index",
    //   });
    // });
    
    
    
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users", options);
  }
};