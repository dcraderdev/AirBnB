// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js')


const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { User, Spot, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { handleValidationErrors, validateSpotEdit, validateReview, validateBooking } = require('../../utils/validation');




router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);



// Delete a Spot Image
// Delete an existing image for a Spot.
router.delete('/spot-images/:imageId', requireAuth, async (req, res, next) => {

  const spotImage = await SpotImage.findByPk(req.params.imageId)

   if (!spotImage) {
    const err = new Error("SpotImage couldn't be found");
    err.statusCode = 404;
    return next(err);
  }
  
  await spotImage.destroy()

  return res.status(200).json({
      message: "Successfully deleted",
      statusCode: 2001
  })
})


// Delete a Review Image
// Delete an existing image for a Review.
router.delete('/review-images/:imageId', requireAuth, async (req, res, next) => {

  const reviewImage = await ReviewImage.findByPk(req.params.imageId)

   if (!reviewImage) {
    const err = new Error("ReviewImage couldn't be found");
    err.statusCode = 404;
    return next(err);
  }
  
  await reviewImage.destroy()

  return res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200
  })
})



module.exports = router;



