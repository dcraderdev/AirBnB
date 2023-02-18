// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const { User, Spot, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const app = require('../../app');


const router = express.Router();


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

  const spot = await Spot.findAll({
    where:{id:req.params.spotId}
  })
  if(spot){

    newImage = await SpotImage.create({
      spotId: req.params.spotId,
      url,
      preview
    })
    if(newImage)return res.status(200).json(newImage)
    return res.status(200).json(newImage)

  }
  res.status(400).json({"message":"newImage not saved"})
});


// // Get details of a Spot from an id
router.get('/:spotId', requireAuth, async (req, res, next) => {

  const spot = await Spot.findOne({
      where: { id: req.params.spotId },
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
    if(allSpots){
      //get owner id from current user
      const ownerId = req.user.id
      newSpot = await Spot.create({ownerId,address,city,state,country,lat,lng,name,description,price})
      if(newSpot)return res.status(200).json(newSpot)
    }

});










module.exports = router;
