// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { json } = require('sequelize');
const db = require('../../db/models');




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
    // }),
  check('firstName') 
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName') 
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  //   .custom(value => {
  //     return User.findOne({where:{username:value}})
  //     .then( user => {
  //       if(user){
  //         return Promise.reject("User with that username already exists")
  //       }
  //   })
  // })
  // .withMessage("User with that username already exists"),


  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
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

    err.message = "User already exists",
   next(err)
  
  }
    next({
      message: "User already exists",
      status: 403,
      errors: () => {
        if(err.errors){
          err.errors.map((item) => item.path = item.message)
        }else{
          err.path = 'err.message'
        }
      }
    });
});


// // Login
// // need to make sure that the correct CSRF token
// // is being sent with each request that requires protection
// router.post('/', async (req, res, next) => {
//   try {
//     const { credential, password } = req.body;

//     const user = await User.findOne({
//       where: {
//         [Op.or]: {
//           username: credential,
//           email: credential,
//         },
//       },
//     })
//   if(user){
//     if(user.login(credential, password)){

//         const token = await setTokenCookie(res, user);

//         return res.status(200).json({
//           id: user.id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           username: user.username,
//           token: token,
//         });
//       }

//   }
  
//   } catch (err) {
//     return res.status(401).json({message: "Invalid credentials"})
//   }
// });



module.exports = router;
