// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const { User, Spot } = require('../../db/models');
const router = express.Router();


// test spots route
router.get('/', async (req, res, next) => {

  const allSpots = await Spot.findAll() 

  if(allSpots){
    return res.status(200).json(allSpots)
  }

  res.status(400).json({"message":"allSpots not found"})


});

router.post('/', async (req, res, next) => {

  const allSpots = await Spot.findAll() 
  
  const {address,city,state,country,lat,lng,name,description,price} = req.body

  if(allSpots){

    //get owner id from current user

    const ownerId = 1
    await Spot.create({ownerId,address,city,state,country,lat,lng,name,description,price})

    return res.status(200).json(allSpots)
  }

  res.status(400).json({"message":"allSpots not found"})


});










module.exports = router;
