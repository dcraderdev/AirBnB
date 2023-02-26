// backend/routes/api/reviews.js

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


const router = express.Router();


let schema
 if (process.env.NODE_ENV === 'production') {
  schema = process.env.SCHEMA;  // define your schema in options object
}





// Get all Reviews of the Current User
router.get('/current',requireAuth, async (req, res, next) => {

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
    return next(err)
  }

  if (allReviews) {
    return res.status(200).json({
      "Reviews":allReviews,
    })
  }
});



// Add an Image to a Review based on the Review's id
// Create and return a new image for a review specified by id.
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const { url } = req.body;

  const review = await Review.findByPk(req.params.reviewId, {
    where: { id: req.params.reviewId },
    include: { model: ReviewImage },
  });

  if (!review) {
    const err = new Error('Review not found');
    err.statusCode = 404;
    return next(err);
  }

// Require proper authorization: Review must belong to the current user
  if(parseInt(req.user.id) !== parseInt(review.userId) ){
    const err = new Error('Forbidden');
    err.statusCode = 403;
    return next(err);
  }



  if (review.ReviewImages.length >= 10) {
    const err = new Error(
      'Maximum number of images for this resource was reached'
    );
    err.statusCode = 403;
    return next(err);
  }

  const newReviewImage = await ReviewImage.create({
    reviewId: req.params.reviewId,
    url,
  });
  if (newReviewImage) {
    return res.status(200).json({
      id: newReviewImage.id,
      url: newReviewImage.url,
    });
  }
});


// Edit a Review
// Update and return an existing review.
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {

  const { review, stars } = req.body

  const currReview = await Review.findByPk(req.params.reviewId)

  if (!currReview) {
    const err = new Error("Review couldn't be found");
    err.statusCode = 404;
    return next(err);
  }

// Require proper authorization: Review must belong to the current user
  if(parseInt(req.user.id) !== parseInt(currReview.userId) ){
    const err = new Error('Forbidden');
    err.statusCode = 403;
    return next(err);
  }


  await currReview.update({
    review, stars
  })
  return res.status(200).json(currReview)
})



// Delete a Review
// Delete an existing review.
router.delete('/:reviewId', requireAuth, async (req, res, next) => {

  const review = await Review.findByPk(req.params.reviewId)

  if (!review) {
    const err = new Error("Review couldn't be found");
    err.statusCode = 404;
    return next(err);
  }
  // Require proper authorization: Review must belong to the current user
  if(parseInt(req.user.id) !== parseInt(review.userId) ){
    const err = new Error('Forbidden');
    err.statusCode = 403;
    return next(err);
  }

  
  await review.destroy()

  return res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200
  })
})









module.exports = router;
