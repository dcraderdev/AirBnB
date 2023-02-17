// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });






router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});


// // all encompassing no user.req error handling middleware functionality code
// router.use((req, res, next) => {;

//   if(!req.user){
//     const err = new Error("Forbidden")
//     err.message = "Forbidden"
//     err.status = 403
//     next(err)
//   }
// });








module.exports = router;