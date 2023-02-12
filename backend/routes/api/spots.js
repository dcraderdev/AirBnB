// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { json } = require('sequelize');



const router = express.Router();


// test users route
router.get('/', async (req, res, next) => {
  return res.json({ hey: 'hello' });
});

// Sign up
// need to make sure that the correct CSRF token
// is being sent with each request that requires protection
router.post('/', async (req, res, next) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({
      email,
      username,
      password,
      firstName,
      lastName,
    });



    return res.status(200).json({});

  } catch (err) {

    return res.status(400).json({message: "User already exists"})

    // err.errors.forEach((err)=>{
    //     console.log(err.path);  
    //     console.log(err.message);
    // })

    // next({
    //   message: "User already exists",
    //   status: 403,
    //   errors: err.errors
    //     ? err.errors.map((item) => item.message).join(', ')
    //     : err.message,
    // });

    // return res.status(403).json({
    //     thing: err
    // })



  }
});

module.exports = router;
