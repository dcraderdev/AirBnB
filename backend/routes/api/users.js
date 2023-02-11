// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { json } = require('sequelize');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

const router = express.Router();

// fetch('/api/users', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   },
//   body: JSON.stringify({
//     email: 'firesssstar@spider.man',
//     username: 'Firssssestar',
//     password: 'asdasfasf',
//     firstName: 'Don',
//     lastName: 'Crader'

//   })
// }).then(res => res.json()).then(data => console.log(data));

// test users route
router.get('/', async (req, res, next) => {
  return res.json({ hey: 'hello' });
});

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


    // err.errors.forEach((err)=>{
    //     console.log(err.path);  
    //     console.log(err.message);
    // })

    next({
      message: "User already exists",
      status: 403,
      errors: err.errors
        ? err.errors.map((item) => item.message).join(', ')
        : err.message,
    });

    // return res.status(403).json({
    //     thing: err
    // })



  }
});

module.exports = router;
