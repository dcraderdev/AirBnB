// backend/routes/api/spots.js

// REVIEWS
const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const { User, Spot, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { handleValidationErrors, validateSpotEdit, validateReview, validateSignup, validateLogin } = require('../../utils/validation');

const app = require('../../app');


const router = express.Router();



// const validateReview = [
//   check('address')
//     .exists({ checkFalsy: true })
//     .withMessage('Street address is required'), 
//   check('city') 
//     .exists({ checkFalsy: true })
//     .withMessage('City is required'),
//   check('state') 
//     .exists({ checkFalsy: true })
//     .withMessage('State is required'),
//   check('country')
//     .exists({ checkFalsy: true })
//     .withMessage('Country is required'),
//   check('lat') 
//     .exists({ checkFalsy: true })
//     .withMessage('Latitude is not valid'),
//   check('lng') 
//     .exists({ checkFalsy: true })
//     .withMessage('Longitude is not valid'),
//   check('name')
//     .isLength({ max: 50 })
//     .withMessage('Name must be less than 50 characters'),
//   check('description')
//     .exists({ checkFalsy: true })
//     .withMessage('Description is required'),
//   check('price')
//     .exists({ checkFalsy: true })
//     .withMessage('Price per day is required')
//     .isInt()
//     .withMessage('Price per day is required')
//     ,
//   handleValidationErrors
// ];





// Reviews Landing Page
router.get('/', async (req, res, next) => {
  res.status(400).json({"Reviews":"landing page"})
});


// Get all Reviews of the Current User
router.get('/current',requireAuth, async (req, res, next) => {

  console.log(req.user.id);

  const userSpots = await Review.findAll({
    where:{userId:req.user.id}
  })
  if(userSpots){
    return res.status(200).json(userSpots)
  }
  res.status(400).json({"message":"userSpots not found"})
});










module.exports = router;
