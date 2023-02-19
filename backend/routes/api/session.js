// backend/routes/api/session.js
const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validateSpotEdit, validateReview, validateSignup, validateLogin } = require('../../utils/validation');



const router = express.Router();




// const validateLogin = [
//   check('credential')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage('Email or username is required'),
//   check('password')
//     .exists({ checkFalsy: true })
//     .withMessage('Password is required.'),
//   handleValidationErrors,
// ];



// // Get the Current User
// router.get('/', requireAuth, async (req, res, next) => {
//   if(requireAuth())
//   return res.json({user});
// });






// // Log in
// router.post('/', validateLogin, async (req, res, next) => {
//   const { credential, password } = req.body;
//   const user = await User.login({ credential, password });

//   try{
//     if (!user) {
//       const err = new Error('Login failed');
//       err.status = 401;
//       err.title = 'Login failed';
//       err.errors = ['Invalid credentials'];
//       return next(err);
//     }

//     await setTokenCookie(res, user);

//     return res.json({
//       user,
//     });

//   }
//   catch{
//   }

// });





// Login
// need to make sure that the correct CSRF token
// is being sent with each request that requires protection
router.post('/',validateLogin, async (req, res, next) => {

  const { credential, password } = req.body;
  const user = await User.login({ credential, password });
  
  if(user){
    const token = await setTokenCookie(res, user);
    return res.status(200).json({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              username: user.username,
              token: token,
            });
  }

  const err = new Error("Invalid credentials") 
  err.statusCode = 401
  next(err)
  
});





// Log out
router.delete('/', (_req, res) => {
  // res.clearCookie('XSRF-TOKEN');
  res.clearCookie('token');
  return res.json({ message: 'success' });
});


// Restore session user
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject()
    });
  } else return res.json({});
});

module.exports = router;
