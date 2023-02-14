// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const { User, Spot } = require('../../db/models');
const router = express.Router();


// test spots route
router.get('/', async (req, res, next) => {
  return res.json({ hey: 'hello' });
});



module.exports = router;
