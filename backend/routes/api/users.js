// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validateSpotEdit, validateReview, validateSignup, validateBooking } = require('../../utils/validation');
const { json } = require('sequelize');
const db = require('../../db/models');
const router = express.Router();



// Sign up
// need to make sure that the correct CSRF token
// is being sent with each request that requires protection
router.post('/', validateSignup, async (req, res, next) => {


  let errors = {}
  const { email, password, username, firstName, lastName } = req.body;
  const verifyEmail = await User.findOne({where:{email:email}})
  const verifyUsername = await User.findOne({where:{username:username}})
  if (verifyEmail) errors.username = "User with that username already exists"
  if (verifyUsername) errors.email = "User with that email already exists"


                      
      
  if(errors.username || errors.email){
    const err = new Error("User already exists");
    err.status = 403;
    err.statusCode = 403
    err.errors = errors
    return next(err)
  }

  const user = await User.signup({email,username,password,firstName,lastName,});

  const token = await setTokenCookie(res, user);

  return res.status(200).json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    token: token,
  });
});

module.exports = router;
