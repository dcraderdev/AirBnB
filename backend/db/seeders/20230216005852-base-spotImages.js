'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://s42814.pcdn.co/wp-content/uploads/2020/09/iStock_185930591-scaled.jpg.optimal.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://images.familyhomeplans.com/cdn-cgi/image/fit=scale-down,quality=85/plans/44207/44207-b600.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://cdn.onekindesign.com/wp-content/uploads/2019/10/Traditional-English-Manor-House-Jauregui-Architect-01-1-Kindesign.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://robbreport.com/wp-content/uploads/2022/10/1-35.jpg?w=1000',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://images.wsj.net/im-466164?width=1280&size=1',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://robbreport.com/wp-content/uploads/2022/12/1-11.jpg?w=1000',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://www.myglobalviewpoint.com/wp-content/uploads/2021/04/2a-Beachfront-Estate-with-Private-Hot-Tub.jpg',
        preview: true,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
 
  }
};