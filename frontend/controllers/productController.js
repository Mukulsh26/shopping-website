const { Product } = require('../models');
const { Op } = require('sequelize'); 

exports.getAllProducts = async (req, res) => {
  const { category, priceRange } = req.query;

  
  const whereClause = [];

  if (category) {
    whereClause.push({ category });
  }

  
  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);

    
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return res.status(400).json({ error: 'Price range must be in the format min-max.' });
    }

    whereClause.push({
      price: {
        [Op.gte]: minPrice, 
        [Op.lte]: maxPrice, 
      },
    });
  }

  try {
    const products = await Product.findAll({
      where: whereClause.length > 0 ? { [Op.and]: whereClause } : {},
    });

    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};