// backend/routes/api/spots.js
const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const {
  singleFileUpload,
  singleMulterUpload,
  multipleFilesUpload,
  multipleMulterUpload,
  retrievePrivateFile,
} = require('../../awsS3');
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

router.get('/test', (req, res) => {
  res.status(200).json({ 'XSRF-Token': 'csrfToken' });
});

// Get all Spots
router.get('/', validateQueryParameters, async (req, res, next) => {
  let where = {};

  const page = req.query.page;
  const size = req.query.size;
  let limit = size || 120;
  let offset = limit * (page - 1) || 0;

  if (req.query.minLat) {
    where.lat = { [Op.gte]: req.query.minLat };
  }

  if (req.query.maxLat) {
    where.lat = { [Op.lte]: req.query.maxLat };
  }

  if (req.query.minLat && req.query.maxLat) {
    where.lat = { [Op.between]: [req.query.minLat, req.query.maxLat] };
  }

  if (req.query.minLng) {
    where.lng = { [Op.gte]: req.query.minLng };
  }

  if (req.query.maxLng) {
    where.lng = { [Op.lte]: req.query.maxLng };
  }

  if (req.query.minLng && req.query.maxLng) {
    where.lng = { [Op.between]: [req.query.minLng, req.query.maxLng] };
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
    err.status = 404;
    return next(err);
  }

  let spots;
  if (allSpots) {
    spots = allSpots.map((spot) => {
      spot = spot.toJSON();
      const lat = parseFloat(spot.lat);
      const lng = parseFloat(spot.lng);
      const price = parseFloat(spot.price);
      const avgRating = parseFloat(spot.avgRating).toFixed(2);
      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat,
        lng,
        name: spot.name,
        description: spot.description,
        price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating,
        previewImage: spot.previewImage,
      };
    });
  }
  return res.status(200).json({ Spots: spots, page, size });
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
    err.status = 404;
    return next(err);
  }

  if (userSpots) {
    const spots = userSpots.map((spot) => {
      spot = spot.toJSON();
      const lat = parseFloat(spot.lat);
      const lng = parseFloat(spot.lng);
      const price = parseFloat(spot.price);
      const avgRating = parseFloat(spot.avgRating).toFixed(2);
      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat,
        lng,
        name: spot.name,
        description: spot.description,
        price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating,
        previewImage: spot.previewImage,
      };
    });
    return res.status(200).json({ Spots: spots });
  }
});

// Create a Spot
router.post(
  '/',
  multipleMulterUpload('spotImages', 20),
  requireAuth,
  validateSpotEdit,
  async (req, res, next) => {
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

    if (newSpot) {
      if (req.files && req.files.length > 0) {
        try {
          const imageUrls = await multipleFilesUpload({
            files: req.files,
            public: true,
          });

          for (let i = 0; i < imageUrls.length; i++) {
            const newImage = await SpotImage.create({
              spotId: newSpot.id,
              url: imageUrls[i],
              preview: i === 0 ? true : false,
            });
          }
        } catch (error) {
          console.error('Error uploading files:', error);
        }
      }

      let spot = newSpot.toJSON();
      const lat = parseFloat(spot.lat);
      const lng = parseFloat(spot.lng);
      const price = parseFloat(spot.price);
      return res.status(200).json({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat,
        lng,
        name: spot.name,
        description: spot.description,
        price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
      });
    }

    if (!newSpot) {
      const err = new Error("Spot couldn't be created");
      err.statusCode = 400;
      err.status = 400;
      return next(err);
    }
  }
);

// Add an Image to a Spot based on the Spot's id
router.post(
  '/:spotId/images',
  singleMulterUpload('image'),
  requireAuth,
  async (req, res, next) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.statusCode = 404;
      err.status = 404;
      return next(err);
    }

    // Require proper authorization: Review must belong to the current user
    if (parseInt(req.user.id) !== parseInt(spot.ownerId)) {
      const err = new Error('Forbidden');
      err.statusCode = 403;
      err.status = 403;
      return next(err);
    }

    if (spot) {
      if (preview) {
        await SpotImage.update(
          { preview: false },
          {
            where: { spotId: req.params.spotId },
          }
        );
      }

      const previewImageUrl = req.file
        ? await singleFileUpload({ file: req.file, public: true })
        : null;

      let newImage = await SpotImage.create({
        spotId: req.params.spotId,
        // url,
        previewImageUrl, // <--- swapped out for url
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
        err.status = 400;
        return next(err);
      }
    }
  }
);

// // Get ALL details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId, {
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
    ],
  });

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.statusCode = 404;
    err.status = 404;
    return next(err);
  }

  const reviews = await Review.findAll({
    where: { spotId: spot.id },
    attributes: ['id', 'review', 'stars', 'createdAt'],
    order: [['createdAt', 'DESC']],
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

  const numReviews = reviews.length;
  const avgStarRating = parseFloat(
    reviews.reduce((sum, review) => sum + review.stars, 0) / numReviews
  ).toFixed(2);

  spot = spot.toJSON();
  const lat = parseFloat(spot.lat);
  const lng = parseFloat(spot.lng);
  const price = parseFloat(spot.price);

  return res.status(200).json({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat,
    lng,
    name: spot.name,
    description: spot.description,
    price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    numReviews,
    avgStarRating,
    previewImage: spot.previewImage,
    SpotImages: spot.SpotImages,
    Owner: spot.Owner,
    Reviews: reviews,
  });
});

// // // Get details of a Spot from an id
router.get('/basic/:spotId', async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId, {
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
      // [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('Reviews.stars')),3),'avgStarRating', ],
      [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating'],
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
    err.status = 404;
    return next(err);
  }

  if (spot) {
    const imageUrls = spot.SpotImages.map((image) => {
      retrievePrivateFile(image.url);
    });

    // return res.json(imageUrls);

    spot = spot.toJSON();
    const lat = parseFloat(spot.lat);
    const lng = parseFloat(spot.lng);
    const price = parseFloat(spot.price);
    const numReviews = parseFloat(spot.numReviews);
    const avgStarRating = parseFloat(spot.avgStarRating).toFixed(2);
    return res.status(200).json({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat,
      lng,
      name: spot.name,
      description: spot.description,
      price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews,
      avgStarRating,
      previewImage: spot.previewImage,
      SpotImages: spot.SpotImages,
      Owner: spot.Owner,
    });
  }
});

// // Create a Spot
// router.post('/', requireAuth, validateSpotEdit, async (req, res, next) => {

//   const { address, city, state, country, lat, lng, name, description, price, spotImages } =  req.body;

//   const ownerId = req.user.id;

//   newSpot = await Spot.create({
//     ownerId,
//     address,
//     city,
//     state,
//     country,
//     lat,
//     lng,
//     name,
//     description,
//     price,
//   });

//   if (newSpot){
//     let spot = newSpot.toJSON()
//     const lat = parseFloat(spot.lat);
//     const lng = parseFloat(spot.lng);
//     const price = parseFloat(spot.price);
//     return res.status(200).json({
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
//     });
//   }

//   if (!newSpot) {
//     const err = new Error("Spot couldn't be created");
//     err.statusCode = 400;
//     err.status = 400;
//     return next(err);
//   }

// });

// Edit a Spot
router.put(
  '/:spotId',
  multipleMulterUpload('spotImages', 20),
  requireAuth,
  validateSpotEdit,
  async (req, res, next) => {
    const {
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      name,
      price,
      imagesToRemove,
      stringifiedDefaultImageObject,
    } = req.body;

    let defaultImageObject, defaultImage, isBlob, fileName, imageId;

    console.log('-=-=-=-=-=-=-');

    if (stringifiedDefaultImageObject) {
      defaultImageObject = JSON.parse(stringifiedDefaultImageObject);
      defaultImage = defaultImageObject.defaultImage;
      isBlob = defaultImageObject.isBlob;
      imageId = defaultImageObject.defaultId;
      fileName = defaultImageObject.name;
    }

    console.log(isBlob);
    console.log(defaultImage);

    console.log(defaultImageObject);
    console.log(fileName);

    console.log(imageId);

    const parsedImagesToRemove = imagesToRemove.split(',').map(Number);

    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.statusCode = 404;
      err.status = 404;
      return next(err);
    }

    // Require proper authorization: Review must belong to the current user
    if (parseInt(req.user.id) !== parseInt(spot.ownerId)) {
      const err = new Error('Forbidden');
      err.statusCode = 403;
      err.status = 403;
      return next(err);
    }

    if (spot) {
      // Handle new default, old image
      if (imageId) {
        // Find the current default image and set its preview field to false
        const currentDefaultImage = await SpotImage.findOne({
          where: { spotId, preview: true },
        });
        if (currentDefaultImage) {
          await currentDefaultImage
            .update({ preview: false })
            .then(async () => {
              const newDefaultImage = await SpotImage.findByPk(imageId);
              if (newDefaultImage) {
                await newDefaultImage.update({ preview: true });
              }
            });
        }
      }

      // Handle deletes
      for (let i = 0; i < parsedImagesToRemove.length; i++) {
        const imageId = parsedImagesToRemove[i];
        const spotImage = await SpotImage.findByPk(imageId);
        if (spotImage) {
          await spotImage.destroy();
        }
      }

      // Handle adds
      if (req.files && req.files.length > 0) {
        try {
          const imageUrls = await multipleFilesUpload({
            files: req.files,
            public: true,
          });

          for (let i = 0; i < imageUrls.length; i++) {
            // Check if the uploaded file is the new default image
            const isNewDefaultImage = imageUrls[i].originalName === fileName;

            // If this is the new default image, set the preview field of other images to false
            if (isNewDefaultImage) {
              // Find the current default image and set its preview field to false
              const currentDefaultImage = await SpotImage.findOne({
                where: { spotId, preview: true },
              });
              if (currentDefaultImage) {
                await currentDefaultImage.update({ preview: false });
              }
            }

            
            const newImage = await SpotImage.create({
              spotId: spot.id,
              url: imageUrls[i].url,
              preview: isNewDefaultImage,
            });
          }
        } catch (error) {
          console.error('Error uploading files:', error);
        }
      }
    }

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

// // Edit a Spot
// router.put('/:spotId', requireAuth,validateSpotEdit, async (req, res, next) => {
//     const spot = await Spot.findByPk(req.params.spotId);

//     if (!spot) {
//       const err = new Error("Spot couldn't be found");
//       err.statusCode = 404;
//       err.status = 404;
//       return next(err);
//     }

//   // Require proper authorization: Review must belong to the current user
//   if(parseInt(req.user.id) !== parseInt(spot.ownerId) ){
//     const err = new Error('Forbidden');
//     err.statusCode = 403;
//     err.status = 403;
//     return next(err);
//   }

//     const {
//       address,
//       city,
//       state,
//       country,
//       lat,
//       lng,
//       name,
//       description,
//       price,
//     } = req.body;
//     await spot.update({
//       address,
//       city,
//       state,
//       country,
//       lat,
//       lng,
//       name,
//       description,
//       price,
//     });

//     return res.status(200).json(spot);
//   }
// );

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.statusCode = 404;
    return next(err);
  }

  // Require proper authorization: Review must belong to the current user
  if (parseInt(req.user.id) !== parseInt(spot.ownerId)) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.statusCode = 403;
    return next(err);
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
      err.status = 404;
      err.statusCode = 404;
      return next(err);
    }

    const existingReview = await Review.findOne({
      where: {
        userId: req.user.id,
        spotId: req.params.spotId,
      },
    });

    if (existingReview) {
      const err = new Error('User already has a review for this spot');
      err.status = 403;
      err.statusCode = 403;
      return next(err);
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
        err.status = 403;
        err.statusCode = 403;
        return next(err);
      }

      if (newReview) {
        return res.status(200).json(newReview);
      }
    }
  }
);

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', requireAuth, async (req, res, next) => {
  const spot = await Spot.findOne({ where: { id: req.params.spotId } });
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.statusCode = 404;
    return next(err);
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
      err.status = 404;
      err.statusCode = 404;
      return next(err);
    }

    //Spot must NOT belong to the current user
    if (parseInt(spot.ownerId) == parseInt(req.user.id)) {
      const err = new Error('Forbidden');
      err.status = 403;
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
        err.status = 403;
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
    err.status = 404;
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

  return res.status(200).json({ Bookings: filteredBookings });
});

// // Create a Spot
// router.post('/createspot', requireAuth, validateSpotEdit, async (req, res, next) => {

//   console.log(req);

//   // const { address, city, state, country, lat, lng, name, description, price, spotImages } =  req.body;

//   // const ownerId = req.user.id;

//   // newSpot = await Spot.create({
//   //   ownerId,
//   //   address,
//   //   city,
//   //   state,
//   //   country,
//   //   lat,
//   //   lng,
//   //   name,
//   //   description,
//   //   price,
//   // });

//   //   if (newSpot) {
//   //     // Check if there are any images in the request
//   //     if (req.files && req.files.length > 0) {
//   //       // Process each image and upload it to S3
//   //       const imagesPromises = req.files.map(async (file) => {
//   //         const imageUrl = await singleFileUpload({ file, public: true });
//   //         return SpotImage.create({
//   //           spotId: newSpot.id,
//   //           url: imageUrl,
//   //           preview: false, // or set to true for a specific image if needed
//   //         });
//   //       });

//   //       // Wait for all images to be uploaded and added to the database
//   //       await Promise.all(imagesPromises);
//   //     }

//   //   let spot = newSpot.toJSON()
//   //   const lat = parseFloat(spot.lat);
//   //   const lng = parseFloat(spot.lng);
//   //   const price = parseFloat(spot.price);
//   //   return res.status(200).json({
//   //     id: spot.id,
//   //     ownerId: spot.ownerId,
//   //     address: spot.address,
//   //     city: spot.city,
//   //     state: spot.state,
//   //     country: spot.country,
//   //     lat,
//   //     lng,
//   //     name: spot.name,
//   //     description: spot.description,
//   //     price,
//   //     createdAt: spot.createdAt,
//   //     updatedAt: spot.updatedAt,
//   //   });
//   // }

//   // if (!newSpot) {
//   //   const err = new Error("Spot couldn't be created");
//   //   err.statusCode = 400;
//   //   err.status = 400;
//   //   return next(err);
//   // }
//   return res.json({hey:'hello'})

// });

// Add an Image to a Spot based on the Spot's id
router.post(
  '/:spotId/images',
  singleMulterUpload('image'),
  requireAuth,
  async (req, res, next) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.statusCode = 404;
      err.status = 404;
      return next(err);
    }

    // Require proper authorization: Review must belong to the current user
    if (parseInt(req.user.id) !== parseInt(spot.ownerId)) {
      const err = new Error('Forbidden');
      err.statusCode = 403;
      err.status = 403;
      return next(err);
    }

    if (spot) {
      if (preview) {
        await SpotImage.update(
          { preview: false },
          {
            where: { spotId: req.params.spotId },
          }
        );
      }

      const previewImageUrl = req.file
        ? await singleFileUpload({ file: req.file, public: true })
        : null;

      let newImage = await SpotImage.create({
        spotId: req.params.spotId,
        // url,
        previewImageUrl, // <--- swapped out for url
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
        err.status = 400;
        return next(err);
      }
    }
  }
);

module.exports = router;
