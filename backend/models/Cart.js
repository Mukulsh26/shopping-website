const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

class Cart extends Model {}

Cart.init({
  
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Cart',
});

// Define associations
Cart.associate = (models) => {
  Cart.belongsTo(models.Product, {
    foreignKey: 'productId',
    as: 'Product',
  });
};

module.exports = Cart;