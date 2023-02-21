

// backend/routes/api/spots.js
const express = require('express');
const Sequelize = require('sequelize')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const { User, Spot, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { handleValidationErrors, validateSpotEdit, validateReview } = require('../../utils/validation');
const app = require('../../app');
const spot = require('../../db/models/spot');


const router = express.Router();



// Get all Spots
router.get('/', async (req, res, next) => {
  try {
    const allSpots = await Spot.findAll({
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
        [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
        [Sequelize.fn('MAX', Sequelize.col('SpotImages.url')), 'previewImage']
      ],
      include: [
        {
          model: Review,
          attributes: []
        },
        {
          model: SpotImage,
          attributes: []
        }
      ],
      group: ['Spot.id','SpotImages.id','Reviews.spotId'],
    });

    if (allSpots) {
      return res.status(200).json({ Spots: allSpots });
    }
    
    res.status(400).json({ message: 'allSpots not found' });
  } catch (err) {
    next(err);
  }
});



// Get all Spots owned by the Current User
router.get('/current',requireAuth, async (req, res, next) => {

  const userSpots = await Spot.findAll({
    where:{ownerId:req.user.id}
  })
  if(userSpots){
    return res.status(200).json(userSpots)
  }
  res.status(400).json({"message":"userSpots not found"})
});


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
      return res.status(200).json(newImage)
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
  try {
    const spot = await Spot.findByPk(req.params.spotId,{
      attributes:[
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
      group: ['Spot.id','SpotImages.id','Owner.id','Reviews.spotId'],
      
    })

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }

    return res.status(200).json(spot)

  } catch (err) {
    next(err)
  }
})






// router.get('/:spotId', requireAuth, async (req, res, next) => {
//   const spot = await Spot.findOne({
//     where: { id: req.params.spotId },
//     attributes:[
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
//       [Sequelize.fn('COUNT', Sequelize.col('Reviews.id'),), 'numReviews'],
//       [Sequelize.fn('AVG', Sequelize.col('Reviews.stars'),), 'avgStarRating'],

//     ],
//     include: [
//         {
//             model: SpotImage,
//             attributes: ['id', 'url', 'preview']
//         },
//         {
//             model: User,
//             attributes: ['id', 'firstName', 'lastName']
//         },
//         {
//             model: Review,
//             attributes: []
//         },
//     ],
//     raw:true,
//     group: ['Spot.id','SpotImages.id','User.id'] 
//   })
  
//   if (spot.id) {
//     return res.status(200).json(spot)
//   }
  
//   if (!spot.id || spot.id === null) {
//     return res.status(404).json({
//         message: "Spot couldn't be found",
//         statusCode: 404
//     })
//   }
//   })
  
// router.get('/:spotId', requireAuth, async (req, res, next) => {
// const spot = await Spot.findOne({
//   where: { id: req.params.spotId },
//   attributes:[
//     'id', 
//     'ownerId', 
//     'address', 
//     'city', 
//     'state', 
//     'country', 
//     'lat', 
//     'lng', 
//     'name', 
//     'description', 
//     'price', 
//     'createdAt', 
//     'updatedAt',
//     [Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
//     [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating'],
//   ],
//   include: [
//       {
//           model: SpotImage,
//           attributes: ['id', 'url', 'preview']
//       },
//       {
//           model: User,
//           attributes: ['id', 'firstName', 'lastName']
//       },
//       {
//           model: Review,
//           attributes: []

//       },
//   ],
//   group: ['Spot.id'] // add this line to include the id column in the GROUP BY clause
// })
// })

// if (spot.id) {
//   return res.status(200).json(spot)
// }

// if (!spot.id) {
//   return res.status(404).json({
//       message: "Spot couldn't be found",
//       statusCode: 404
//   })
// }
// })






// router.get('/:spotId', requireAuth, async (req, res, next) => {

//   const spot = await Spot.findByPk(req.params.spotId,{
//     attributes:[
//       [Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
//       [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
//     ],
//     include: [
//       {
//         model: Review,
//         attributes: []
//       },
//       {
//         model: SpotImage,
//         attributes: ['id', 'url', 'preview']
//       },
//       {
//         model: User,
//         as: 'Owner',
//         attributes: ['id', 'firstName', 'lastName']
//       },
//     ]
//   })

//   if (spot) {

//     console.log(spot);



//     // Map the SpotImage model objects to a new array of objects
//     const spotImages = spot.SpotImages.map((image) => ({
//       id: image.id,
//       url: image.url,
//       preview: image.preview,
//     }));

//     return res.status(200).json(
//       // spot
//       {
//       id: spot.id,
//       ownerId: spot.ownerId,
//       address: spot.address,
//       city: spot.city,
//       state: spot.state,
//       country: spot.country,
//       lat: spot.lat,
//       lng: spot.lng,
//       name: spot.name,
//       description: spot.description,
//       price: spot.price,
//       createdAt: spot.createdAt,
//       updatedAt: spot.updatedAt,
//       numReviews: spot.numReviews,
//       avgStarRating: spot.avgRating, // change to avgRating
//       SpotImages: spotImages, // use the new array of objects
//       Owner: spot.Owner, // use the alias
//     }
//     );
//   }

//   if (!spot) {
//     const err = new Error("Spot couldn't be found")
//     err.statusCode = 404
//     next(err)
//   }
// });









// router.get('/:spotId', requireAuth, async (req, res, next) => {

//   const spot = await Spot.findByPk(req.params.spotId,{
//     attributes:[
//       [Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
//       [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
//     ],
//     include: [
//       {
//         model: Review,
//         attributes: []
//       },
//       {
//         model: SpotImage,
//         attributes: ['id', 'url', 'preview']
//       },
//       {
//         model: User,
//         as: 'Owner',
//         attributes: ['id', 'firstName', 'lastName']
//       },
//     ]
//   })

//     // return res.status(200).json('spot')


//   if (req.params.spotId) {
    
//     // return res.status(200).json(spot)
//     return res.status(200).json({
//       id: spot.id,
//       ownerId: spot.ownerId,
//       address: spot.address,
//       city: spot.city,
//       state: spot.state,
//       country: spot.country,
//       lat: spot.lat,
//       lng: spot.lng,
//       name: spot.name,
//       description: spot.description,
//       price: spot.price,
//       createdAt: spot.createdAt,
//       updatedAt: spot.updatedAt,
//       SpotImages: spot.SpotImages,
//       Owner: spot.User,
//     })
    
//   }

//   if (!spot) {
//     const err = new Error("Spot couldn't be found")
//     err.statusCode = 404
//     next(err)
//   }
// });



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
router.post('/:spotId/reviews',requireAuth,validateReview, async (req, res, next) => {
  
  const spot = await Spot.findByPk(req.params.spotId)
  const {review, stars} = req.body

  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.statusCode = 404
    next(err)
  }

  if(spot,{userId:req.user.id}){
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
      const err = new Error("Review not created")
      err.statusCode = 404
      next(err)
    }

    return res.status(200).json(newReview)
  }

});






module.exports = router;
