// backend/routes/api/spots.js

// REVIEWS
const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const { User, Spot, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { handleValidationErrors, validateSpotEdit, validateReview, validateSignup, validateLogin } = require('../../utils/validation');
const sequelize = require('sequelize')
const app = require('../../app');
const review = require('../../db/models/review');

const router = express.Router();




// Reviews Landing Page
router.get('/', async (req, res, next) => {
  res.status(400).json({"Reviews":"landing page"})
});



// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const {image} = req.body
  
  const review = await Review.findByPk(req.params.reviewId)

  if(review){
    return res.status(200).json(review)
  }


})




// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  const userReviews = await Review.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
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
          [sequelize.literal('(SELECT `url` FROM `SpotImages` WHERE `SpotImages`.`spotId` = `Spot`.`id` ORDER BY `createdAt` DESC LIMIT 1)'), 'previewImage']
        ],
        include: [
          {
            model: SpotImage,
            attributes: []
          }
        ]
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });
  if (userReviews) {
    return res.status(200).json({
      Reviews: userReviews
    })
  }

  res.status(400).json({
    "message": "userSpots not found"
  });

});


// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const userReviews = await Review.findAll({
      where: {
        userId: req.user.id
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Spot,
          include: [
            {
              model: SpotImage,
              attributes: ['url'],
              limit: 1
            }
          ]
        }
      ]
    });

    if (userReviews.length) {
      const reviews = userReviews.map(review => {
        const { id, userId, spotId, review: reviewText, stars, createdAt, updatedAt, User, Spot } = review.toJSON();
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
          Spot: { ...Spot.toJSON(), previewImage }
        }
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
