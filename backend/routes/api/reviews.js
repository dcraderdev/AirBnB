// backend/routes/api/spots.js

// REVIEWS
const express = require('express');

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const {
  User,
  Spot,
  Booking,
  SpotImage,
  Review,
  ReviewImage,
} = require('../../db/models');
const {
  handleValidationErrors,
  validateSpotEdit,
  validateReview,
  validateSignup,
  validateLogin,
  validateBooking,
} = require('../../utils/validation');
const sequelize = require('sequelize');
const Sequelize = require('sequelize');
const app = require('../../app');
const review = require('../../db/models/review');
const spot = require('../../db/models/spot');

const router = express.Router();


let schema
 if (process.env.NODE_ENV === 'production') {
  schema = process.env.SCHEMA;  // define your schema in options object
}


// [
//   Sequelize.literal(
//     `(SELECT url FROM ${
//       schema ? `"${schema}"."SpotImages"` : 'SpotImages'
//     } WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)`
//   ),
//   'previewImage',
// ],

// *************
// *************
// *************
// *************
// *************
// *************
// *************
// *************
// *************


// // Get all Reviews of the Current User - works 
// router.get('/current', async (req, res, next) => {

//   const allReviews = await Review.findAll({
//     where: { userId: req.user.id },
//     include:[
//       { model: User, attributes: ['id', 'firstName', 'lastName'] },

//       { model: Spot,
//         attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',
//         [
//           Sequelize.literal(
//             `(SELECT url FROM ${
//               schema ? `"${schema}"."SpotImages"` : 'SpotImages'
//             } WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)`
//           ),
//           'previewImage',
//         ]],
//       },
//       { model: ReviewImage, attributes: ['id', 'url'] }
//     ],
//     attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt']
//   })

//   if (!allReviews) {
//     const err = new Error("All reviews not found")
//     err.statusCode = 404
//     next(err)
//   }

//   if (allReviews) {
//     res.status(200).json({"Reviews":allReviews})
//   }
// });




// // Get all Reviews of the Current User - works only thru reviews
// router.get('/current', async (req, res, next) => {

  // const allReviews = await Review.scope({method: ["allSpots", req.user.id]}).findAll()
  
//   if (!allReviews) {
//     const err = new Error("All reviews not found")
//     err.statusCode = 404
//     next(err)
//   }

//   if (allReviews) {
//     res.status(200).json({"Reviews":allReviews})
//   }
// });



// *************
// *************
// *************
// *************
// *************
// *************
// *************


// Get all Reviews of the Current User - works only locally due to literal
router.get('/current', async (req, res, next) => {

  // const allReviews = await Review.scope({method: ["allSpots", req.user.id]}).findAll()

  // const allReviews = await Spot.scope('withUserReviews').findAll({
  //   where: { ownerId: req.user.id },
  // });

  // const allSpots = await Spot.scope({method: ["withPreview", req.user.id]}).findAll()


  const allReviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      {
        model: Spot.scope({ method: ['withPreview', req.user.id] }),
      },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ],
    attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
  });
  
  if (!allReviews) {
    const err = new Error("All reviews not found")
    err.statusCode = 404
    next(err)
  }

  if (allReviews) {
    res.status(200).json({
      "Reviews":allReviews,
      // allSpots,
      // "Reviews":allReviews
    })
  }
});


//   const allReviews = await Review.findAll({
//     where: { userId: req.user.id },
//     include:[
//       { model: User, attributes: ['id', 'firstName', 'lastName'] },

//       { model: Spot.scope({method: ["allSpots", req.user.id]}).findAll()}
//   //       attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',
//   //       [
//   //         Sequelize.literal(
//   //           `(SELECT url FROM ${
//   //             schema ? `"${schema}"."SpotImages"` : 'SpotImages'
//   //           } WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)`
//   //         ),
//   //         'previewImage',
//   //       ]],
//   //     },
//   //     { model: ReviewImage, attributes: ['id', 'url'] }
//     ],
//   //   attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt']
//   })


//   // const allReviews = await Review.scope({method: ["allSpots", req.user.id]}).findAll()
    
  











// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const { url } = req.body;
  const review = await Review.findByPk(req.params.reviewId, {
    where: { id: req.params.reviewId },
    include: { model: ReviewImage },
  });

  if (!review) {
    const err = new Error('Review not found');
    err.statusCode = 404;
    next(err);
  }

  if (review.ReviewImages.length >= 10) {
    const err = new Error(
      'Maximum number of images for this resource was reached'
    );
    err.statusCode = 403;
    next(err);
  }

  const newReviewImage = await ReviewImage.create({
    reviewId: req.params.reviewId,
    url,
  });
  if (newReviewImage) {
    res.status(200).json({
      id: newReviewImage.id,
      url: newReviewImage.url,
    });
  }
});

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  const userReviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: Spot,
        attributes: [
          'id',
          'ownerId',
          'address',
          'city',
          'state',
          'country',
          'lat',
          'lng',
          'name',
          'price',
          [
            sequelize.literal(
              '(SELECT `url` FROM `SpotImages` WHERE `SpotImages`.`spotId` = `Spot`.`id` ORDER BY `createdAt` DESC LIMIT 1)'
            ),
            'previewImage',
          ],
        ],
        include: [
          {
            model: SpotImage,
            attributes: [],
          },
        ],
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url'],
      },
    ],
  });
  if (userReviews) {
    return res.status(200).json({
      Reviews: userReviews,
    });
  }

  res.status(400).json({
    message: 'userSpots not found',
  });
});

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const userReviews = await Review.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: Spot,
          include: [
            {
              model: SpotImage,
              attributes: ['url'],
              limit: 1,
            },
          ],
        },
      ],
    });

    if (userReviews.length) {
      const reviews = userReviews.map((review) => {
        const {
          id,
          userId,
          spotId,
          review: reviewText,
          stars,
          createdAt,
          updatedAt,
          User,
          Spot,
        } = review.toJSON();
        const previewImage = Spot.SpotImages[0]?.url || null;
        return {
          id,
          userId,
          spotId,
          review: reviewText,
          stars,
          createdAt,
          updatedAt,
          User,
          Spot: { ...Spot.toJSON(), previewImage },
        };
      });
      return res.status(200).json({ Reviews: reviews });
    }

    return res.status(404).json({ message: 'User reviews not found' });
  } catch (error) {
    next(error);
  }
});

// router.get('/current',requireAuth, async (req, res, next) => {

//   console.log(req.user.id);

//   const userReviews = await Review.findAll({

//     where: {
//       userId: req.user.id
//     },
//     include:
//       {
//         model: User,
//         attributes: ['id', 'firstName', 'lastName']
//       },
//       include:
//        {
//         model: Spot,
//         attributes: [],

//          include:{
//           model: SpotImage,
//           attributes: ['url'],
// }
//        }

//   })

//   if(userReviews){
//     return res.status(200).json({
//       Reviews:userReviews
//     })
//   }
//   res.status(400).json({"message":"userSpots not found"})
// });

module.exports = router;
