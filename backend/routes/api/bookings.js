// / backend/routes / api / bookings.js

const express = require('express');
const sequelize = require('sequelize');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { json } = require('sequelize');
const app = require('../../app');
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require('../../utils/auth');
const { check } = require('express-validator');
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
const router = express.Router();

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
  // ----------------------------------
  const currentUsersBookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: Spot,
        attributes: ['id','ownerId','address','city','state','country','lat','lng','name','price',],
        include: [
          {
            model: SpotImage,
            attributes: ['url'],
            where: { preview: true },
            required: false,
          },
        ],
      },
    ],
    attributes: ['id','spotId','userId','startDate','endDate','createdAt','updatedAt',],
  });
  if (currentUsersBookings) {
    const bookings = currentUsersBookings.map((booking) => {
      const {
        id,
        spotId,
        userId,
        startDate,
        endDate,
        createdAt,
        updatedAt,
        Spot,
      } = booking;
      const previewImage =
        Spot.SpotImages.length > 0 ? Spot.SpotImages[0].url : null;
      return {
        id,
        spotId,
        Spot: {
          id: Spot.id,
          ownerId: Spot.ownerId,
          address: Spot.address,
          city: Spot.city,
          state: Spot.state,
          country: Spot.country,
          lat: Spot.lat,
          lng: Spot.lng,
          name: Spot.name,
          price: Spot.price,
          previewImage,
        },
        userId,
        startDate,
        endDate,
        createdAt,
        updatedAt,
      };
    });

    return res.status(200).json({
      Bookings: bookings,
    });
  }

  const err = new Error("Bookings couldn't be found");
  err.statusCode = 404;
  next(err);
});

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.statusCode = 404;
    next(err);
  }

  if (booking) {
    await booking.destroy({});
    return res.status(200).json({
      message: 'Successfully deleted',
      statusCode: 200,
    });
  }
});

module.exports = router;
