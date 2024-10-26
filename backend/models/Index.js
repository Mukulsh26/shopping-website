const Product = require('./Product');
const Cart = require('./Cart');
const User = require('./Users'); 

const sequelize = require('../config/db');

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables synced!');
});


Cart.associate({ Product, User });
Product.associate({ Cart, User });
User .associate = (models) => {
  // Define associations here if needed
};

module.exports = {
  Product,
  Cart,
  User, 
};