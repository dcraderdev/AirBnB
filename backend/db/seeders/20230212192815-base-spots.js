'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: 'Cabin Road',
          city: 'Sierra Nevada',
          state: 'California',
          country: 'United States',
          lat: 37.204719,
          lng: -119.338541,
          name: 'Cozy Cabin in Sierra Nevada',
          description:
            'Charming cabin-style rental nestled in the Sierra Nevada Mountains.',
          price: 1000,
        },
        {
          ownerId: 2,
          address: 'Mansion Street',
          city: 'San Diego',
          state: 'California',
          country: 'United States',
          lat: 32.715738,
          lng: -117.161084,
          name: 'Luxurious Mansion in San Diego',
          description:
            'Elegant and spacious mansion in the heart of San Diego with stunning views.',
          price: 1000,
        },
        {
          ownerId: 1,
          address: 'Waco House Road',
          city: 'Waco',
          state: 'Texas',
          country: 'United States',
          lat: 31.549333,
          lng: -97.14667,
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
          description:
            'Exquisite 6-bedroom, 5-bath estate with traditional English manor design.',
          price: 1000,
        },
        {
          ownerId: 1,
          address: 'Florida Estate Road',
          city: 'Miami',
          state: 'Florida',
          country: 'United States',
          lat: 25.76168,
          lng: -80.19179,
          name: 'Elegant Estate in Florida',
          description:
            'Luxurious and spacious estate in sunny Florida, perfect for relaxation and entertainment.',
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
          description:
            'Breathtaking Miami mansion with stunning architecture and modern design.',
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
          description:
            'Experience paradise in this gorgeous Hawaiian mansion with ocean views.',
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
          description:
            'Relax in this stunning beachfront house with a private hot tub and ocean views.',
          price: 1000,
        },
        {
          ownerId: 1,
          address: 'Sunset Boulevard',
          city: 'Lahaina',
          state: 'Hawaii',
          country: 'United States',
          lat: 20.878333,
          lng: -156.6825,
          name: 'Sunset Haven in Lahaina',
          description:
            'Experience breathtaking sunsets and lush tropical gardens at this tranquil retreat.',
          price: 1200,
        },
        {
          ownerId: 1,
          address: 'Palm Tree Lane',
          city: 'Kailua',
          state: 'Hawaii',
          country: 'United States',
          lat: 21.402222,
          lng: -157.739444,
          name: 'Kailua Palm Paradise',
          description:
            'Stay in this luxurious villa surrounded by palm trees, just steps away from the pristine beach.',
          price: 1100,
        },
        {
          ownerId: 1,
          address: 'Kapalua Bay Road',
          city: 'Lahaina',
          state: 'Hawaii',
          country: 'United States',
          lat: 20.9942,
          lng: -156.6675,
          name: 'Luxury Villa in Maui',
          description:
            'Enjoy panoramic ocean views and luxury amenities from this stunning villa on the west coast of Maui.',
          price: 1500,
        },
        {
          ownerId: 1,
          address: 'Alii Drive',
          city: 'Kailua-Kona',
          state: 'Hawaii',
          country: 'United States',
          lat: 19.6397,
          lng: -155.9965,
          name: 'Oceanfront Condo in Kona',
          description:
            'Wake up to the sound of waves crashing on the shore from this oceanfront condo on the Big Island of Hawaii.',
          price: 800,
        },
        {
          ownerId: 1,
          address: 'Kalanianaole Highway',
          city: 'Waimanalo',
          state: 'Hawaii',
          country: 'United States',
          lat: 21.3378,
          lng: -157.6989,
          name: 'Tropical Bungalow in Oahu',
          description:
            'Escape to this secluded bungalow surrounded by palm trees and lush tropical gardens in Waimanalo on the island of Oahu.',
          price: 900,
        },
        {
          ownerId: 1,
          address: 'Kuakini Highway',
          city: 'Kailua-Kona',
          state: 'Hawaii',
          country: 'United States',
          lat: 19.6404,
          lng: -155.9946,
          name: 'Private Retreat in Kona',
          description:
            'Relax in this tranquil retreat nestled among the trees in the hills above Kailua-Kona on the Big Island of Hawaii.',
          price: 1200,
        },
        {
          ownerId: 1,
          address: 'Kapoho Beach Road',
          city: 'Pahoa',
          state: 'Hawaii',
          country: 'United States',
          lat: 19.5021,
          lng: -154.9022,
          name: 'Secluded Cottage in Pahoa',
          description:
            'Escape to this secluded cottage surrounded by lush tropical vegetation just minutes from the black sand beaches of Pahoa on the Big Island of Hawaii.',
          price: 700,
        },
        {
          ownerId: 1,
          address: 'Wailea Alanui Drive',
          city: 'Wailea',
          state: 'Hawaii',
          country: 'United States',
          lat: 20.6806,
          lng: -156.4384,
          name: 'Beachfront Resort in Maui',
          description:
            'Experience the ultimate luxury vacation at this beachfront resort in Wailea on the island of Maui, complete with stunning ocean views and world-class amenities.',
          price: 2000,
        },
        {
          ownerId: 1,
          address: 'Halekai Place',
          city: 'Princeville',
          state: 'Hawaii',
          country: 'United States',
          lat: 22.2192,
          lng: -159.4827,
          name: 'Oceanfront Villa in Kauai',
          description: 'Experience the ultimate in tropical luxury at this oceanfront villa in Princeville on the island of Kauai, complete with panoramic ocean views and luxurious amenities.',
          price: 2500,
          },
          {
          ownerId: 1,
          address: 'Kapalua Bay Drive',
          city: 'Lahaina',
          state: 'Hawaii',
          country: 'United States',
          lat: 20.9949,
          lng: -156.6673,
          name: 'Luxury Condo in Maui',
          description: 'Relax in style at this luxurious condo in Kapalua on the west coast of Maui, with breathtaking ocean views and access to world-class amenities.',
          price: 1800,
          },
          {
          ownerId: 1,
          address: 'Kukio Nui Drive',
          city: 'Kailua-Kona',
          state: 'Hawaii',
          country: 'United States',
          lat: 19.8172,
          lng: -155.9969,
          name: 'Private Retreat in Kona',
          description: 'Escape to this exclusive private retreat in Kukio on the Big Island of Hawaii, surrounded by lush tropical gardens and offering unparalleled luxury and privacy.',
          price: 3000,
          }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        ownerId: { [Op.in]: ['1'] },
      },
      {}
    );
  },
};
