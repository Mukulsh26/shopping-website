const express = require('express');
const router = express.Router();
const { getCartItems, addToCart, removeCartItems } = require('../controllers/cartController');

router.get('/getCart', getCartItems);
router.post('/addCart', addToCart);
router.delete('/removeCart/:id', removeCartItems); // Update this line

module.exports = router;
