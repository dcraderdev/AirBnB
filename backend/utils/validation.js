// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');


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



    // .custom(value => {
    //     return User.findOne({where:{email:value}})
    //     .then( user => {
    //       if(user){
    //         return Promise.reject("User with that email already exists")
    //       }
    //   })
    // })
    
    
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



module.exports = {
  handleValidationErrors, validateSpotEdit, validateReview, validateSignup, validateLogin
};




