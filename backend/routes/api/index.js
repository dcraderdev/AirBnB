// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');



const { setTokenCookie } = require('../../utils/auth.js.js');
const { User } = require('../../db/models');
// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js.js');
const { requireAuth } = require('../../utils/auth.js.js');

router.use(restoreUser);



router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});



router.get('/require-auth',requireAuth,(req, res) => { 
   return res.json(req.user);
  }
);


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


