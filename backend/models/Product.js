const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
class Product extends Model {}

Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Product',
});

// Define associations
Product.associate = (models) => {
  Product.hasMany(models.Cart, {
    foreignKey: 'productId',
    as: 'Carts',
  });
};

module.exports = Product;