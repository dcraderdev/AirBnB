'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


// cabin style in sierra nevadas, ca
// https://s42814.pcdn.co/wp-content/uploads/2020/09/iStock_185930591-scaled.jpg.optimal.jpg

// mansion in san diego ca
// https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg

// nice house in waco, tx
// https://images.familyhomeplans.com/cdn-cgi/image/fit=scale-down,quality=85/plans/44207/44207-b600.jpg

// 6 bedroom 5 bath in san diego, ca
// https://cdn.onekindesign.com/wp-content/uploads/2019/10/Traditional-English-Manor-House-Jauregui-Architect-01-1-Kindesign.jpg


// estate in florida 
//https://robbreport.com/wp-content/uploads/2022/10/1-35.jpg?w=1000


// mansion in Miamim Fl
//https://images.wsj.net/im-466164?width=1280&size=1

// mansion in hawaii
//https://robbreport.com/wp-content/uploads/2022/12/1-11.jpg?w=1000

// beach hosue in hawaii
// https://www.myglobalviewpoint.com/wp-content/uploads/2021/04/2a-Beachfront-Estate-with-Private-Hot-Tub.jpg




module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: 'Cabin Road',
        city: 'Sierra Nevada',
        state: 'California',
        country: 'United States',
        lat: 37.204719,
        lng: -119.338541,
        name: 'Cozy Cabin in Sierra Nevada',
        description: 'Charming cabin-style rental nestled in the Sierra Nevada Mountains.',
        price: 1000,
      },
      {
        ownerId: 1,
        address: 'Mansion Street',
        city: 'San Diego',
        state: 'California',
        country: 'United States',
        lat: 32.715738,
        lng: -117.161084,
        name: 'Luxurious Mansion in San Diego',
        description: 'Elegant and spacious mansion in the heart of San Diego with stunning views.',
        price: 1000,
      },
      {
        ownerId: 1,
        address: 'Waco House Road',
        city: 'Waco',
        state: 'Texas',
        country: 'United States',
        lat: 31.549333,
        lng: -97.146670,
        name: 'Charming House in Waco',
        description: 'Beautiful and comfortable family house in Waco, Texas.',
        price: 1000,
      },
      {
        ownerId: 1,
        address: 'San Diego Estate Street',
        city: 'San Diego',
        state: 'California',
        country: 'United States',
        lat: 32.715768,
        lng: -117.161025,
        name: 'Grand 6-bedroom Estate in San Diego',
        description: 'Exquisite 6-bedroom, 5-bath estate with traditional English manor design.',
        price: 1000,
      },
      {
        ownerId: 1,
        address: 'Florida Estate Road',
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        lat: 25.761680,
        lng: -80.191790,
        name: 'Elegant Estate in Florida',
        description: 'Luxurious and spacious estate in sunny Florida, perfect for relaxation and entertainment.',
        price: 1000,
      },
      {
        ownerId: 1,
        address: 'Miami Mansion Street',
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        lat: 25.761679,
        lng: -80.191793,
        name: 'Exquisite Mansion in Miami',
        description: 'Breathtaking Miami mansion with stunning architecture and modern design.',
        price: 1000,
      },
      {
        ownerId: 1,
        address: 'Hawaii Mansion Road',
        city: 'Honolulu',
        state: 'Hawaii',
        country: 'United States',
        lat: 21.306944,
        lng: -157.858337,
        name: 'Luxurious Mansion in Hawaii',
        description: 'Experience paradise in this gorgeous Hawaiian mansion with ocean views.',
        price: 1000,
      },
      {
        ownerId: 1,
        address: 'Beach House Street',
        city: 'Honolulu',
        state: 'Hawaii',
        country: 'United States',
        lat: 21.306943,
        lng: -157.858336,
        name: 'Beachfront House in Hawaii',
        description: 'Relax in this stunning beachfront house with a private hot tub and ocean views.',
        price: 1000,
      }
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
