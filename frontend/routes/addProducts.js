const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Route to add a new product
router.post('/add-products', async (req, res) => {
  const { name, price, category, imageUrl, description } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      price,
      category,
      imageUrl,
      description,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

module.exports = router;
