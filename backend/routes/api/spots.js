// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const { User, Spot, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const app = require('../../app');


const router = express.Router();



const validateSpotEdit = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'), 
  check('city') 
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state') 
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat') 
    .exists({ checkFalsy: true })
    .withMessage('Latitude is not valid'),
  check('lng') 
    .exists({ checkFalsy: true })
    .withMessage('Longitude is not valid'),
  check('name')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required')
    .isInt()
    .withMessage('Price per day is required')
    ,
  handleValidationErrors
];





// Get all Spots
router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll() 
    if(allSpots){
      return res.status(200).json({Spots:allSpots})
    }
    res.status(400).json({"message":"allSpots not found"})
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


// // Get details of a Spot from an id
router.get('/:spotId', requireAuth, async (req, res, next) => {

  const spot = await Spot.findByPk(req.params.spotId,{
    include: [
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
      },
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  })

  if (spot) {
    return res.status(200).json({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      SpotImages: spot.SpotImages,
      Owner: spot.User,
    })
  }

  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.statusCode = 404
    next(err)
  }
});



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








module.exports = router;
