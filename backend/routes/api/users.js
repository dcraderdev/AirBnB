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

  try {
    const { email, password, username, firstName, lastName } = req.body;

    const user = await User.signup({
      email,
      username,
      password,
      firstName,
      lastName,
    });

    const token = await setTokenCookie(res, user);

    return res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: token,
    });

  } catch (err) {
    err.errors.forEach((err) => {
    err.errors = {}
      if (err.path == "username") {
        err.statusCode = 403
        err.message = "User already exists"
        err.errors.username = "User with that username already exists"       
        // next(err)
      }

      if (err.path == "email") {
        err.statusCode = 403
        err.message = "User already exists"
        err.errors.username = "User with that email already exists"              
      }
    })
    next(err)

  }

});




module.exports = router;
