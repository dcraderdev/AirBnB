// backend/routes/api/spots.js
const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
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
  validateBooking,
  validateQueryParameters,
} = require('../../utils/validation');
const router = express.Router();

// Get all Spots
router.get('/', validateQueryParameters, async (req, res, next) => {
  let where = {};

  const page = req.query.page;
  const size = req.query.size;
  let limit = size || 5;
  let offset = limit * (page - 1) || 0;

  if (req.query.minLat) {
    where.lat = { [Op.gte]: req.query.minLat };
  }

  if (req.query.maxLat) {
    where.lat = { [Op.lte]: req.query.maxLat };
  }

  if (req.query.minLat && req.query.maxLat) {
    where.price = { [Op.between]: [req.query.minLat, req.query.maxLat] };
  }

  if (req.query.minPrice) {
    where.price = { [Op.gte]: req.query.minPrice };
  }

  if (req.query.maxPrice) {
    where.price = { [Op.lte]: req.query.maxPrice };
  }

  if (req.query.minPrice && req.query.maxPrice) {
    where.price = { [Op.between]: [req.query.minPrice, req.query.maxPrice] };
  }

  let options = {
    where,
    limit: limit,
    offset: offset,
  };

  const allSpots = await Spot.scope({
    method: ['withPreviewAndRating'],
  }).findAll(options);

  if (!allSpots) {
    const err = new Error('Spots not found');
    err.statusCode = 404;
    next(err);
  }

  if (allSpots) {
    return res.status(200).json({ Spots: allSpots });
  }
  // if (allSpots) {
  //   const spots = allSpots.map(spot => {
  //     const lat = parseFloat(spot.lat);
  //     const lng = parseFloat(spot.lng);
  //     const price = parseFloat(spot.price);
  //     const avgRating = parseFloat(spot.avgRating);
  //     // const avgRating = spot.avgRating;
  //     return { 
  //       id: spot.id,
  //       ownerId: spot.ownerId,
  //       address: spot.address,
  //       city: spot.city,
  //       state: spot.state,
  //       country: spot.country,
  //       lat,
  //       lng,
  //       name: spot.name,
  //       description: spot.description,
  //       price,
  //       createdAt: spot.createdAt,
  //       updatedAt: spot.updatedAt,
  //       avgRating,
  //       previewImage: spot.previewImage,
  //     };
  //   });
  //   return res.status(200).json({ Spots: spots });
  // }


});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  const userSpots = await Spot.scope({
    method: ['withPreviewAndRating'],
  }).findAll({
    where: { ownerId: req.user.id },
  });

  if (!userSpots) {
    const err = new Error('Spots not found');
    err.statusCode = 404;
    next(err);
  }

  if (userSpots) {
    return res.status(200).json({ Spots: userSpots });
  }
});

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.statusCode = 404;
    next(err);
  }

  if (spot) {
    let newImage = await SpotImage.create({
      spotId: req.params.spotId,
      url,
      preview,
    });

    if (newImage) {
      return res.status(200).json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview,
      });
    }
    if (!newImage) {
      const err = new Error("Image couldn't be added");
      err.statusCode = 400;
      next(err);
    }
  }
});

// // // Get details of a Spot from an id
router.get('/:spotId', requireAuth, async (req, res, next) => {

  const spot = await Spot.findByPk(req.params.spotId, {
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
      'description',
      'price',
      'createdAt',
      'updatedAt',
      [Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
      [
        Sequelize.fn(
          'ROUND',
          Sequelize.fn('AVG', Sequelize.col('Reviews.stars')),
          1
        ),
        'avgStarRating',
      ],
    ],
    include: [
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview'],
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: Review,
        attributes: [],
      },
    ],
    group: ['Spot.id', 'SpotImages.id', 'Owner.id', 'Reviews.spotId'],
  });
  if (!spot || spot === null) {
    const err = new Error("Spot couldn't be found");
    err.statusCode = 404;
    next(err);
  }

  return res.status(200).json(spot);
});

// Create a Spot
router.post('/', requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const ownerId = req.user.id;
  newSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  if (newSpot) return res.status(201).json(newSpot);
});

// Edit a Spot
router.put(
  '/:spotId',
  requireAuth,
  validateSpotEdit,
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.statusCode = 404;
      next(err);
    }

    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    await spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    return res.status(200).json(spot);
  }
);

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.statusCode = 404;
    next(err);
  }

  if (spot) {
    await spot.destroy({});
    return res.status(200).json({
      message: 'Successfully deleted',
      statusCode: 200,
    });
  }
});

// Create a Review for a Spot based on the Spot's id
// /api/spots/:spotId/reviews
router.post(
  '/:spotId/reviews',
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const { review, stars } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.statusCode = 404;
      next(err);
    }

    const existingReview = await Review.findOne({
      where: {
        userId: req.user.id,
        spotId: req.params.spotId,
      },
    });

    if (existingReview) {
      const err = new Error('User already has a review for this spot');
      err.statusCode = 403;
      next(err);
    }

    if (spot) {
      const newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review: review,
        stars: stars,
      });
      if (!newReview) {
        const err = new Error('Review not created.');
        err.statusCode = 403;
        next(err);
      }

      if (newReview) {
        return res.status(200).json({
          id: newReview.id,
          userId: newReview.userId,
          spotId: newReview.spotId,
          review: newReview.review,
          stars: newReview.stars,
        });
      }
    }
  }
);

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', requireAuth, async (req, res, next) => {
  const spot = await Spot.findOne({ where: { id: req.params.spotId } });
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.statusCode = 404;
    next(err);
  }

  const reviews = await Review.findAll({
    where: { spotId: req.params.spotId },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url'],
      },
    ],
  });
  return res.status(200).json({ Reviews: reviews });
});

// ***************

// Create a Booking from a Spot based on the Spot's id
// Require Authentication: true
// Require proper authorization: Spot must NOT belong to the current user
router.post(
  '/:spotId/bookings',
  requireAuth,
  validateBooking,
  async (req, res, next) => {
    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.statusCode = 404;
      return next(err);
    }

    //Spot must NOT belong to the current user
    if (parseInt(spot.ownerId) == parseInt(req.user.id)) {
      const err = new Error('Spot must NOT belong to the current user');
      err.statusCode = 403;
      return next(err);
    }

    // Check for conflicting bookings
    const allBookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
    });

    for (let booking of allBookings) {
      let errors = {};

      let start = booking.startDate;
      let end = booking.endDate;
      const startTime = new Date(startDate);
      const endTime = new Date(endDate);

      if (
        (startTime >= start && startTime <= end) ||
        (startTime <= start && endTime >= end)
      ) {
        errors.startDate = 'Start date conflicts with an existing booking';
      }

      if (endTime >= start && endTime <= end) {
        errors.endDate = 'End date conflicts with an existing booking';
      }

      if (errors.startDate || errors.endDate) {
        const err = new Error(
          'Sorry, this spot is already booked for the specified dates'
        );
        err.errors = errors;
        err.statusCode = 403;
        return next(err);
      }
    }

    // Create the new booking
    const newBooking = await Booking.create({
      spotId: req.params.spotId,
      userId: req.user.id,
      startDate,
      endDate,
    });

    if (newBooking) {
      return res.status(200).json({
        id: newBooking.id,
        spotId: newBooking.spotId,
        userId: newBooking.userId,
        startDate: newBooking.startDate,
        endDate: newBooking.endDate,
        createdAt: newBooking.createdAt,
        updatedAt: newBooking.updatedAt,
      });
    }
  }
);

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.statusCode = 404;
    return next(err);
  }

  const bookings = await Booking.findAll({
    where: { spotId: req.params.spotId },
    include: {
      model: User,
      attributes: ['id', 'firstName', 'lastName'],
    },
  });

  if (req.user.id === spot.ownerId) {
    return res.status(200).json({ Bookings: bookings });
  }

  const filteredBookings = bookings.map((booking) => {
    return {
      spotId: booking.spotId,
      startDate: booking.startDate,
      endDate: booking.endDate,
    };
  });

  res.status(200).json({ Bookings: filteredBookings });
});

module.exports = router;
