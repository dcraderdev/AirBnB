// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');




// // all encompassing no user.req error handling middleware functionality code
// router.use((req, res, next) => {
//   if(!req.user){
//     const err = new Error("Forbidden")
//     err.message = "Forbidden"
//     err.status = 403
//     next(err)
//   }
// });


router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);



// Get the Current User
router.get('/require-auth',requireAuth,(req, res) => { 
  return res.json({
    user: {
      id:req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      username: req.user.username
    } 
  });
})




router.get('/restore-user',(req, res) => {  
  return res.json(req.user);
}
);




router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});


module.exports = router;



