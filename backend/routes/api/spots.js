

// backend/routes/api/spots.js
const express = require('express');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const { User, Spot, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { handleValidationErrors, validateSpotEdit, validateReview, validateBooking } = require('../../utils/validation');
const app = require('../../app');
const spot = require('../../db/models/spot');


const router = express.Router();



// Get all Spots
router.get('/', async (req, res, next) => {
  const allSpots = await Spot.scope({method:['withPreviewAndRating']}).findAll()

  if (!allSpots) {
    const err = new Error("Spots not found")
    err.statusCode = 404
    next(err)
  }

  if(allSpots){
    return res.status(200).json({Spots:allSpots})
  }

});


// Get all Spots owned by the Current User
router.get('/current',requireAuth, async (req, res, next) => {
  const userSpots = await Spot.scope({method:['withPreviewAndRating']}).findAll({
    where:{ownerId:req.user.id},
  })

  if (!userSpots) {
    const err = new Error("Spots not found")
    err.statusCode = 404
    next(err)
  }

  if(userSpots){
    return res.status(200).json({Spots:userSpots})
  }

});


// // Get all Spots owned by the Current User
// router.get('/current',requireAuth, async (req, res, next) => {

//   const userSpots = await Spot.findAll({
//     where:{ownerId:req.user.id},
//     attributes: [
//       'id', 
//       'ownerId', 
//       'address', 
//       'city', 
//       'state', 
//       'country', 
//       'lat', 
//       'lng', 
//       'name', 
//       'description', 
//       'price', 
//       'createdAt', 
//       'updatedAt',  
//       [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 1), 'avgRating'],
//       [Sequelize.fn('MAX', Sequelize.col('SpotImages.url')), 'previewImage']
//     ],
//     include: [
//       {
//         model: Review,
//         attributes: []
//       },
//       {
//         model: SpotImage,
//         attributes: []
//       }
//     ],
//     group: ['Spot.id','SpotImages.id','Reviews.spotId'],
//   })
//   if(userSpots){
//     return res.status(200).json(userSpots)
//   }
//   res.status(400).json({"message":"userSpots not found"})
// });


// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images',requireAuth, async (req, res, next) => {

  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId)

  if(spot){
    let newImage = await SpotImage.create({
      spotId: req.params.spotId,
      url,
      preview
    })
    if(newImage){
      return res.status(200).json({
        id:newImage.id,
        url: newImage.url,
        preview: newImage.preview
      })
    }
    if (!newImage) {
      const err = new Error("Image couldn't be added")
      err.statusCode = 400
      next(err)
    }
  }
  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.statusCode = 404
    next(err)
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
        [Sequelize.fn('COUNT', Sequelize.col('Reviews.id'),), 'numReviews'],
        [Sequelize.fn('AVG', Sequelize.col('Reviews.stars'),), 'avgStarRating'],
    ],
    include: [
        {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Review,
            attributes: []
        },
    ],

})


    if (!spot || spot === null) {
      const err = new Error("Spot couldn't be found")
      err.statusCode = 404
      next(err)
    }

    return res.status(200).json(spot)

})



// Create a Spot
router.post('/', requireAuth, async (req, res, next) => {

    const {address,city,state,country,lat,lng,name,description,price} = req.body
    const ownerId = req.user.id
    newSpot = await Spot.create({ownerId,address,city,state,country,lat,lng,name,description,price})
    if(newSpot)return res.status(201).json(newSpot)

});


// Edit a Spot
router.put('/:spotId', requireAuth, validateSpotEdit, async (req, res, next) => {

  const spot = await Spot.findByPk(req.params.spotId)


  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.statusCode = 404
    next(err)
  }

  const { address, city, state, country, lat, lng, name, description, price } = req.body
  await spot.update({
      address, city, state, country, lat, lng, name, description, price
  })

  return res.status(200).json(spot)
})


// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {

  console.log('=-=-=-=-');
  console.log('=-=-=-=-');
  console.log('=-=-=-=-');
  console.log('=-=-=-=-');
  console.log('=-=-=-=-');
  console.log('=-=-=-=-');
  console.log('=-=-=-=-');


  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.statusCode = 404
    next(err)
  }

  if(spot){
    await spot.destroy({})
    return res.status(200).json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  }
})




// Create a Review for a Spot based on the Spot's id
// /api/spots/:spotId/reviews
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {

  const { review, stars } = req.body
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.statusCode = 404
    next(err)
  }


  const existingReview = await Review.findOne({ where: { 
    userId: req.user.id,
    spotId: req.params.spotId
  } })

  if (existingReview) {
    const err = new Error("User already has a review for this spot")
    err.statusCode = 403
    next(err)
  }


     if(spot){
        const newReview = await Review.create({
          userId: req.user.id,
          spotId: req.params.spotId,
          review: review,
          stars: stars
        })
        if (!newReview) {
          const err = new Error("Review not created.")
          err.statusCode = 403
          next(err)
        }

        if (newReview) {
            return res.status(200).json({
                id: newReview.id,
                userId: newReview.userId,
                spotId: newReview.spotId,
                review: newReview.review,
                stars: newReview.stars,
            })
        }
     }
    
  })





// ***************


// Create a Booking from a Spot based on the Spot's id  
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
  const { startDate, endDate } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.statusCode = 404;
    return next(err);
  }

  const conflictBookings = await Booking.findAll({
    where: {
      spotId: req.params.spotId,
      [Op.or]: [
        {
          startDate: { [Op.between]: [startDate, endDate] },
        },
        {
          endDate: { [Op.between]: [startDate, endDate] },
        },
        {
          startDate: { [Op.lte]: startDate },
          endDate: { [Op.gte]: endDate },
        },
      ],
    },
  });




    if (conflictBookings.length > 0) {

      console.log('-=-=-=-=-=-=-=');
      console.log('-=-=-=-=-=-=-=');
      console.log('-=-=-=-=-=-=-=');
      console.log('-=-=-=-=-=-=-=');
   
      console.log(conflictBookings);

      console.log('-=-=-=-=-=-=-=');
      console.log('-=-=-=-=-=-=-=');
      console.log('-=-=-=-=-=-=-=');
      console.log('-=-=-=-=-=-=-=');

      // conflictBookings.map((booking) => {
      //   if (booking.endDate >= startDate && booking.startDate <= startDate) {
      //     const err = new Error("Start date conflicts with an existing booking")
      //     err.statusCode = 403
      //     next(err)
      //   } else {
      //     const err = new Error("End date conflicts with an existing booking")
      //     err.statusCode = 403
      //     next(err)
      //   }
      // });

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
});






// router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {

//     const { startDate, endDate } = req.body;

//     const spot = await Spot.findByPk(req.params.spotId)

//     if (!spot) {
//       const err = new Error("Spot couldn't be found")
//       err.statusCode = 404
//       next(err)
//     }



//     const conflictBookings = await Booking.findOne({
//       where: {
//         [Op.or]: [
//           {
//             startDate: { [Op.between]: [startDate, endDate] }
//           },
//           {
//             endDate: { [Op.between]: [startDate, endDate] }
//           },
//           {
//             startDate: { [Op.lte]: startDate },
//             endDate: { [Op.gte]: endDate },
//           },
//         ],
//       },
//     });



//     if (conflictBookings.length > 0) {
//       const conflicts = conflictBookings.map((booking) => {
//         if (booking.endDate >= startDate && booking.startDate <= startDate) {
//           const err = new Error("Start date conflicts with an existing booking")
//           err.statusCode = 403
//           next(err)
//         } else {
//           const err = new Error("End date conflicts with an existing booking")
//           err.statusCode = 403
//           next(err)
//         }
//       });

//     // Create the new booking
//     const newBooking = await Booking.create({
//         spotId:req.params.spotId,
//         userId: req.user.id,
//         startDate,
//         endDate,
//     });
//     if (newBooking) {
//         return res.status(200).json({
//             id: newBooking.id,
//             spotId: newBooking.spotId,
//             userId: newBooking.userId,
//             startDate: newBooking.startDate,
//             endDate: newBooking.endDate,
//             createdAt: newBooking.createdAt,
//             updatedAt: newBooking.updatedAt,
//         });
//     }
// })



// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    try {
        // ----------------------------------------------------------
        const spot = await Spot.findByPk(spotId)
        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        // ----------------------------------------------------------
        const bookings = await Booking.findAll({
            where: { spotId },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
        });
        if (userId === bookings[0]?.User?.id) {
            // If the user is the owner of the spot
            res.status(200).json({ Bookings: bookings });
        } else {
            // If the user is not the owner of the spot
            const filteredBookings = bookings.map((booking) => {
                return {
                    spotId: booking.spotId,
                    startDate: booking.startDate,
                    endDate: booking.endDate,
                };
            });
            res.status(200).json({ Bookings: filteredBookings });
        }
    } catch (error) {
        next(error);
    }
})











module.exports = router;
