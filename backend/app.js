// app.js

const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();


const { Pool } = require('pg');

const { ValidationError } = require('sequelize');

const routes = require('./routes');




const {User, Spot, Booking, SpotImage, Review, ReviewImage } = require('./db/models')


app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());


// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
    );
    


 app.use(routes)   



 app.use(routes) 





//  app.use('/api/spots', require('./routes/api/spots'));
//  app.use('/api/users', require('./routes/api/users'));



// /* ------------------------- API Endpoints -------------------------- */



app.get('/', async(req,res,next)=>{

  const allSpots = await Review.findAll() 
  // console.log(allBookings);
  if(allSpots){
    return res.status(200).json(allSpots)
  }
  res.status(400).json({"message":"allSpots not found"})

  // res.json({home:'page'})
})



// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});


app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});


// all other errors 
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});


module.exports = app;
