// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const { User, Spot } = require('../../db/models');
const app = require('../../app');


const router = express.Router();




router.use((err, req, res, next) => {
  console.log('in here');
  console.log('in here');
  console.log('in here');
  console.log('in here');
  console.log('in here');
  console.log('in here');
  console.log('in here');
  if(!token){
    const err = new Error("NO TOKEN")
    err.message = "TOKEN required"
    err.status = 403
    next(err)
  }
});


// test spots route
router.get('/', async (req, res, next) => {

  if(req.user){}

  if(!req.user){
    const err = new Error("ERRRRRRRRRR")
    err.message = "Authentication required"
    err.status = 401
    next(err)
  }

  const allSpots = await Spot.findAll() 
  if(allSpots){
    return res.status(200).json(allSpots)
  }
  res.status(400).json({"message":"allSpots not found"})
});





router.post('/', async (req, res, next) => {
  if(!req.user){
    throw new Error(
      {
        title: 'test',
        message: 'test',
        errors: 'test',
        stack: 'test'
      }
    )
  }


  if(req.user){
    const allSpots = await Spot.findAll() 
    
    const {address,city,state,country,lat,lng,name,description,price} = req.body

    if(allSpots){

      //get owner id from current user

      const ownerId = req.user.id
      await Spot.create({ownerId,address,city,state,country,lat,lng,name,description,price})

      return res.status(200).json(allSpots)
    }
  }



  res.status(400).json({"message":"allSpots not found"})


});










module.exports = router;
