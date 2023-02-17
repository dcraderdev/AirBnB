// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const { User, Spot } = require('../../db/models');
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


// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
  console.log(req.query.spotId);

  const spot = await Spot.findAll({
    where:{id:req.query.spotId}
  }) 

  if(spot){
    return res.status(200).json(spot)
  }
  res.status(400).json({"message":"spot not found"})
});





// Create a Spot
router.post('/', async (req, res, next) => {

  if(req.user){
    const allSpots = await Spot.findAll() 
    const {address,city,state,country,lat,lng,name,description,price} = req.body
    if(allSpots){
      //get owner id from current user
      const ownerId = req.user.id
      newSpot = await Spot.create({ownerId,address,city,state,country,lat,lng,name,description,price})
      if(newSpot)return res.status(200).json(newSpot)
    }
  }
  
  // if(!req.user){
  //   const err = new Error("Forbidden")
  //   err.message = 'Forbidden'
  //   err.status = 403
  //   next(err)
  // }


});










module.exports = router;
