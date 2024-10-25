const { Cart, Product } = require('../models');

// Get all cart items
exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      include: {
        model: Product,
        as: 'Product',
        attributes: ['id', 'name', 'price', 'imageUrl', 'description'],
      },
    });

    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const cartItem = await Cart.create({ productId, quantity });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

//remove items from cart
exports.removeCartItems = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await Cart.destroy({
      where: { id: id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Cart item removed successfully' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
};


