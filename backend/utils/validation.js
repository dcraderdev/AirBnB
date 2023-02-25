// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const { INTEGER } = require('sequelize');


// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {


  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { 
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    const err = Error("Bad request");
    err.errors = errors;
    err.message = "Validation Error";
    err.statusCode = 400;
    err.title = "Bad request";
    next(err);
  }
  next();
};




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


const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'), 

  check('stars') 
    .exists({ checkFalsy: true })
    .withMessage('Stars must be an integer from 1 to 5')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),

  handleValidationErrors
];


const validateSignup = [
  
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),

  check('username')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.')
    .exists({ checkFalsy: true })
    .withMessage("Username is required")
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),

  check('firstName') 
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),

  check('lastName') 
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),

  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.')
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];


const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required.'),
  handleValidationErrors,
];



const validateBooking= [ 
  check('startDate')
  .exists({ checkFalsy: true })
  .withMessage(''),
check('endDate')
  .exists({ checkFalsy: true })
  .custom((endDate, { req }) => {
      const startDate = req.body.startDate;
      if (endDate && startDate) {
          if (new Date(endDate) <= new Date(startDate)) {
              throw new Error("endDate cannot be on or before startDate")
          }
      }
      return true
  })
  .withMessage(''),
handleValidationErrors
]

const validateBookingEdit= [ 
  check('startDate')
  .exists({ checkFalsy: true })
  .withMessage(''),
check('endDate')
  .exists({ checkFalsy: true })
  .custom((endDate, { req }) => {
      const startDate = req.body.startDate;
      if (endDate && startDate) {
          if (new Date(endDate) <= new Date(startDate)) {
              throw new Error("endDate cannot come before startDate")
          }
      }
      return true
  })
  .withMessage(''),
handleValidationErrors
]









const validateQueryParameters= [ 

  check('page')
  .optional()
  .isInt({ min: 1, max: 10 })
  .withMessage('Value must be an integer from 1 to 10'),

  
  check('size')
  .optional()
  .isInt({ min: 1, max: 20 })
  .withMessage('Value must be an integer from 1 to 20'),

  
  check('minLat')
  .optional()
  .isInt()
  .withMessage('Minimum latitude is invalid'),

  check('maxLat')
  .optional()
  .isInt()
  .withMessage('Maximum latitude is invalid'),
  
  check('minLng')
  .optional()
  .isInt()
  .withMessage('Minimum longitude is invalid'),
  
  check('maxLng')
  .optional()
  .isInt()
  .withMessage('Maximum longitude is invalid'),
  
  check('minPrice')
  .optional()
  .isInt({ min: 0})
  .withMessage('Minimum price must be greater than or equal to 0'),
  
  check('maxPrice')
  .optional()
  .isInt({ min: 0})
  .withMessage('Maximum price must be greater than or equal to 0'),
handleValidationErrors
]





module.exports = {
  handleValidationErrors, validateSpotEdit, validateReview, 
  validateSignup, validateLogin, validateBooking, validateBookingEdit, validateQueryParameters
};




