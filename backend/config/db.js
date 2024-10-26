// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with MySQL settings
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Ensure this is set to 'mysql'
    dialectModule: require('mysql2'), // This line is optional but can be added for clarity
});

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected...');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;