const express = require('express');
const { body } = require('express-validator');
const {
  registerUser ,
  loginUser ,
  authenticateJWT,
} = require('../controllers/authController');

const router = express.Router();

// Register Route
router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  registerUser 
);

// Login Route
router.post('/login', loginUser );

module.exports = router;