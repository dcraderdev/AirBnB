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
          spotId: 1,
          url: 'https://media.gettyimages.com/id/200180083-001/photo/armchair-beside-stone-fireplace-in-log-cabin.jpg?s=612x612&w=gi&k=20&c=yvUdr16shZ_zU0dJ01WYKjXK7Erj9UyAggVpW-QW9IE=',
          preview: false,
        },
        {
          spotId: 1,
          url: 'https://media.istockphoto.com/id/185106726/photo/rustic-cabin-interior.jpg?s=170667a&w=0&k=20&c=-b4fZXzTpT9BdYO4quJcipPuRPINSrUv_8wWKMs3HcM=',
          preview: false,
        },
        {
          spotId: 1,
          url: 'https://wallpapercave.com/wp/wp9194965.jpg',
          preview: false,
        },
        {
          spotId: 1,
          url: 'https://media.istockphoto.com/id/1350915033/photo/luxurious-log-cabin-interior.jpg?b=1&s=170667a&w=0&k=20&c=vdye_VLuFDUeqjJ8SVWXXYBkKCy7yqBOUYLLPFcPoG4=',
          preview: false,
        },
        {
          spotId: 1,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDTar8MW53kqh78M6Bhg4u3TTlq2VQ5KO6w&usqp=CAU',
          preview: false,
        },
        {
          spotId: 1,
          url: 'https://live.staticflickr.com/2781/4467084233_e2c96d8272_b.jpg',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg',
          preview: true,
        },
        {
          spotId: 2,
          url: 'https://i.insider.com/5e389df35bc79c536974f1f8?width=700.jpg',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://travellersworldwide.com/wp-content/uploads/2022/04/shutterstock_1446113918.jpg.webp',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://images.squarespace-cdn.com/content/v1/58487dc4b8a79b6d02499b60/1659113029412-0YP2JAMKKVK26GN24V4H/Francis+York+Bespoke+Modern+Mansion+in+the+Hills+of+Bel+Air+1.jpg',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://authenticflorida.com/wp-content/uploads/2021/03/thumbnail-1-640x480.jpg',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://i.pinimg.com/originals/88/2b/7b/882b7b64f8ece3cb5d06682dec5c58fd.jpg',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://s3.amazonaws.com/finegardening.s3.tauntoncloud.com/app/uploads/2019/11/06142238/7.jpeg',
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://images.familyhomeplans.com/cdn-cgi/image/fit=scale-down,quality=85/plans/44207/44207-b600.jpg',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://na.rdcpix.com/6d88e5731f7bf0bfd8aec506d1f358b8w-c4109625419rd-w832_h468_r4_q80.jpg',
          preview: false,
        },

        {
          spotId: 3,
          url: 'https://www.leveragere.com/slir/w1050-h550-c1050x550/assets/609.jpg',
          preview: false,
        },
        
        {
          spotId: 3,
          url: 'https://static.wixstatic.com/media/76d808_00a008f133a74fe38c3887fa547cd5f1~mv2.jpg/v1/fill/w_640,h_568,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/76d808_00a008f133a74fe38c3887fa547cd5f1~mv2.jpg',
          preview: false,
        },

        {
          spotId: 3,
          url: 'https://st.hzcdn.com/simgs/pictures/bathrooms/hoover-baths-highland-design-build-img~dce121200d9623f1_14-6384-1-d2d6925.jpg',
          preview: false,
        },

        {
          spotId: 3,
          url: 'https://www.progardentips.com/wp-content/uploads/2022/01/Sunken-Gardens-730x548.jpg',
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://i.pinimg.com/originals/08/1e/01/081e01afb82ec1d12543feb5811fc8c7.jpg',
          preview: false,
        },
        
        
        {
          spotId: 4,
          url: 'https://cdn.onekindesign.com/wp-content/uploads/2019/10/Traditional-English-Manor-House-Jauregui-Architect-01-1-Kindesign.jpg',
          preview: true,
        },
        {
          spotId: 4,
          url: 'https://nypost.com/wp-content/uploads/sites/2/2022/08/13000-identical-brothers-asking-54m-for-side-by-side-mansions-01.jpg',
          preview: false,
        },
        {
          spotId: 4,
          url: 'https://floridatrippers.com/wp-content/uploads/2021/06/Botanical-Gardens-in-FL-Naples-Botanical-Gardens-1.jpg',
          preview: false,
        },
        {
          spotId: 4,
          url: 'https://i.insider.com/62223628dcce010019a6cf6d?width=1000&format=jpeg&auto=webp',
          preview: false,
        },
        {
          spotId: 4,
          url: 'https://i0.wp.com/stockellhomes.com/wp-content/uploads/2020/02/P1052763copy-scaled.jpg?resize=1080%2C720&ssl=1',
          preview: false,
        },
        {
          spotId: 4,
          url: 'https://www.homestratosphere.com/wp-content/uploads/2017/02/Bathroom-628.jpg',
          preview: false,
        },
        {
          spotId: 4,
          url: 'https://murreybowling.com/wp-content/uploads/home-bowling-alley.jpg',
          preview: false,
        },
        {
          spotId: 4,
          url: 'https://st.hzcdn.com/simgs/pictures/landscapes/sophisticated-south-of-the-border-transformation-where-color-is-king-siobhan-s-magical-garden-transformations-img~4de1499f03b32f6a_8-1010-1-aa88fe0.jpg',
          preview: false,
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
          url: 'https://images.wsj.net/im-644493/?width=2000&#038;size=1.949.jpg',
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
