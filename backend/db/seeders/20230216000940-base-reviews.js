'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 3,
        spotId: 1,
        review: 'We had a fantastic time at this lovely Airbnb. The host was incredibly welcoming and made sure we had everything we needed. The apartment itself was beautifully decorated, clean, and comfortable. The location was also perfect, just a short walk from local shops, restaurants, and attractions. We highly recommend this place for anyone looking for a relaxing getaway!',
        stars: 5
      },
      {
        userId: 4,
        spotId: 1,
        review: 'Our stay at this Airbnb exceeded our expectations. The host was friendly, attentive, and provided us with great recommendations for nearby activities and eateries. The place was clean, well-equipped, and felt like a home away from home. The neighborhood was quiet and safe, making it a perfect spot for a family vacation. We will definitely return in the future!',
        stars: 4
      },
      {
        userId: 5,
        spotId: 2,
        review: 'This Airbnb was the perfect spot for our city break. The apartment was stylish, clean, and had everything we needed for a comfortable stay. The highlight was the incredible view from the balcony, where we enjoyed our morning coffee and evening drinks. The host was also extremely helpful and accommodating. We can\'t wait to come back!',
        stars: 4
      },
      {
        userId: 5,
        spotId: 3,
        review: 'We loved our stay at this charming Airbnb! The location couldn\'t have been better - we were within walking distance of all the main attractions and public transportation. The host was friendly and provided excellent tips on where to eat and what to see. The apartment itself was clean, cozy, and had all the necessary amenities. We highly recommend this place for anyone visiting the city!',
        stars: 4
      },
      {
        userId: 1,
        spotId: 2,
        review: 'Our family had an unforgettable stay at this amazing Airbnb. The house was spacious, beautifully furnished, and spotlessly clean. The outdoor space was a lovely bonus, with a large patio and garden area where we enjoyed al fresco dining and relaxation. The host was very welcoming and made sure our stay was perfect in every way. We can\'t wait to return for another visit!',
        stars: 4
      },
      {
        userId: 3,
        spotId: 3,
        review: 'Our stay at this Airbnb was nothing short of magical. The property was nestled in a quiet, serene area, providing us with the perfect escape from our busy lives. The host was warm and welcoming, ensuring we had everything we needed for a comfortable and enjoyable stay. The accommodation itself was well-appointed, clean, and tastefully decorated. We can\'t wait to return for another rejuvenating retreat!',
        stars: 5
      },
      {
        userId: 4,
        spotId: 2,
        review: 'We had an incredible experience at this stylish loft Airbnb. The space was spotlessly clean, beautifully designed, and equipped with top-notch amenities. The host was very attentive and went above and beyond to ensure we had a memorable stay. The location was also excellent, with easy access to local attractions, dining, and shopping. We highly recommend this loft for a luxurious and relaxing getaway!',
        stars: 4
      },
      {
        userId: 5,
        spotId: 1,
        review: 'Unfortunately, our experience at this Airbnb was far from satisfactory. The host was unresponsive and difficult to reach, leaving us feeling unwelcome and uneasy. The property itself was not as advertised - it was quite dirty and lacked some basic amenities. Additionally, the noise from the neighboring properties made it difficult to get a good night\'s sleep. We wouldn\'t recommend this place and will be looking for a different accommodation in the future.',
        stars: 2
      },
      {
        userId: 2,
        spotId: 3,
        review: 'Our stay at this Airbnb was a letdown. The property was in dire need of maintenance, with broken fixtures, peeling paint, and a musty smell throughout. The bedding and towels provided were stained and worn, making us question the cleanliness of the space. The host was unapologetic when we brought these issues to their attention and showed little concern for our comfort. We regret booking this property and would not recommend it to others.',
        stars: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
 
  }
};