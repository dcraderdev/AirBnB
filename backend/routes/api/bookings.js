// / backend/routes / api / bookings.js

const express = require('express');
const sequelize = require('sequelize');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { json } = require('sequelize');
const app = require('../../app');
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require('../../utils/auth');
const { check } = require('express-validator');
const {
  User,
  Spot,
  Booking,
  SpotImage,
  Review,
  ReviewImage,
} = require('../../db/models');
const {
  handleValidationErrors,
  validateSpotEdit,
  validateReview,
  validateSignup,
  validateLogin,
  validateBooking,
  validateBookingEdit
} = require('../../utils/validation');
// const { down } = require('../../db/migrations/20230211215204-create-booking');
const router = express.Router();




// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {


    // const allBookings = await Booking.findAll({})

    // allBookings.forEach(element => {
    //     element.destroy()
    // });

  const currentUsersBookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: Spot,
        attributes: ['id','ownerId','address','city','state','country','lat','lng','name','price',],
        include: [
          {
            model: SpotImage,
            attributes: ['url'],
            where: { preview: true },
            required: false,
          },
        ],
      },
    ],
    attributes: ['id','spotId','userId','startDate','endDate','createdAt','updatedAt',],
  });
  if (currentUsersBookings) {
    const bookings = currentUsersBookings.map((booking) => {
      const {
        id,
        spotId,
        userId,
        startDate,
        endDate,
        createdAt,
        updatedAt,
        Spot,
      } = booking;
      const previewImage =
        Spot.SpotImages.length > 0 ? Spot.SpotImages[0].url : null;
      return {
        id,
        spotId,
        Spot: {
          id: Spot.id,
          ownerId: Spot.ownerId,
          address: Spot.address,
          city: Spot.city,
          state: Spot.state,
          country: Spot.country,
          lat: Spot.lat,
          lng: Spot.lng,
          name: Spot.name,
          price: Spot.price,
          previewImage,
        },
        userId,
        startDate,
        endDate,
        createdAt,
        updatedAt,
      };
    });

    return res.status(200).json({
      Bookings: bookings,
    });
  }

  const err = new Error("Bookings couldn't be found");
  err.statusCode = 404;
  next(err);
});





// Delete a Booking
// Require proper authorization: Booking must belong to the current user or the Spot must belong to the current user
router.delete('/:bookingId', requireAuth, async (req, res, next) => {

  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.statusCode = 404;
    return next(err);
  }
  
  if(booking){

    const spot = await Spot.findOne({where:{id: booking.spotId}});
    
    // Booking must belong to the current user or the Spot must belong to the current user
    let currUser = (parseInt(booking.userId) === parseInt(req.user.id))
    let owner = (parseInt(spot.ownerId) === parseInt(req.user.id))
    if (!currUser && !owner) {
        const err = new Error("Forbidden")
        err.statusCode = 403
        return next(err)
    }


    let today = new Date()
        
    if (booking.startDate <= today) {
        const err = new Error("Bookings that have been started can't be deleted");
        err.statusCode = 403;
        return next(err);
    }


    await booking.destroy();
    return res.status(200).json({
        message: 'Successfully deleted',
        statusCode: 200,
    });
  
  }


});



// Edit a Booking
// Require proper authorization: Booking must belong to the current user
router.put('/:bookingId', requireAuth, validateBookingEdit, async (req, res, next) => {

    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        const err = new Error("Booking couldn't be found")
        err.statusCode = 404
        return next(err)
    }

    // Booking must belong to the current user
    let currUser = (parseInt(booking.userId) === parseInt(req.user.id))
    if (!currUser) {
    const err = new Error("Forbidden")
    err.statusCode = 403
    return next(err)
    }


   


    //check if endDate is past current date
    const currentDate = new Date();
    if(currentDate > booking.endDate){
      const err = new Error("Past bookings can't be modified")
      err.statusCode = 403
      return next(err)
    }


  // Check for conflicting bookings
  const allBookings = await Booking.findAll({where: {spotId: booking.spotId}});


  for(let booking of allBookings){
    let errors = {}

    let start = booking.startDate
    let end = booking.endDate
    const startTime = new Date(startDate)
    const endTime = new Date(endDate)

    let thisBooking = parseInt(booking.id) === parseInt(req.params.bookingId)

    if(thisBooking){
        continue
    }

    if((startTime >= start && startTime <= end) || (startTime <= start && endTime >= end)){
        errors.startDate = "Start date conflicts with an existing booking"
    }

    if(endTime >= start && endTime <= end){
      errors.endDate = "End date conflicts with an existing booking"
    }

    if(errors.startDate || errors.endDate){
      const err = new Error("Sorry, this spot is already booked for the specified dates");
      err.errors = errors
      err.statusCode = 403;
      return next(err);
    }

  }

    const update = await booking.update( { startDate, endDate } )
    if(update) return res.status(200).json(booking)
    else {
      const err = new Error("Booking not updated")
      err.statusCode = 403
      return next(err)
    }
    
  })












module.exports = router;
