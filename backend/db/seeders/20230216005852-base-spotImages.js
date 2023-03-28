'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(
      options,
      [
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

        {
          spotId: 9,
          url: 'https://assets.site-static.com/userFiles/2805/image/Blog_Post_Images/What_are_hawaii_houses_like/017-APC_1429.jpg',
          preview: true,
        },
        {
          spotId: 10,
          url: 'https://wpcdn.us-east-1.vip.tn-cloud.net/www.hawaiihomemag.com/content/uploads/2021/03/01_0.jpg',
          preview: true,
        },
        {
          spotId: 11,
          url: 'https://www.panaviz.com/real-estate-photographer/wp-content/uploads/2021/05/41-1010-Laumilo-St-12-12-2020-010-scaled.jpg',
          preview: true,
        },
        {
          spotId: 12,
          url: 'https://ap.rdcpix.com/7f91b857a29c6f0d352c7976419c40f3l-m3739878920od-w480_h360_x2.jpg',
          preview: true,
        },
        {
          spotId: 13,
          url: 'https://images.wsj.net/im-644493/?width=2000&#038;size=1.949',
          preview: true,
        },
        {
          spotId: 14,
          url: 'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1103i215%2Fjwrgde5ngqtqmbj17t9ts4j314i215&option=N&h=472&permitphotoenlargement=false',
          preview: true,
        },
        {
          spotId: 15,
          url: 'https://photos.zillowstatic.com/fp/556e3eea318487dd80a9a0dd4e03c99f-p_e.jpg',
          preview: true,
        },
        {
          spotId: 16,
          url: 'https://robbreport.com/wp-content/uploads/2022/12/1-11.jpg?w=1000',
          preview: true,
        },
        {
          spotId: 17,
          url: 'https://media.architecturaldigest.com/photos/568ef57c02bad8496774de87/16:9/w_4256,h_2394,c_limit/1_WebEstate_Kailua,%20Hawaii%20.jpg',
          preview: true,
        },
        {
          spotId: 18,
          url: 'https://static.dezeen.com/uploads/2018/01/hut-house-johnston-marklee-architecture-residential-hawaii-usa_dezeen_sq-1.jpg',
          preview: true,
        },

        {
          spotId: 19,
          url: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2020/4/15/0/HUHH2020-Beachfront_Kihei-HI-13.JPG.rend.hgtvcom.966.644.suffix/1586973887499.jpeg',
          preview: true,
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  },
};
