const Product = require('./Product');
const Cart = require('./Cart');

const sequelize = require('../config/db');


sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables synced!');
});

Cart.associate({ Product });
Product.associate({ Cart });

module.exports = {
  Product,
  Cart,
};
