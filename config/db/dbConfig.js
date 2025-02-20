const { Sequelize, DataTypes } = require('sequelize');

const dbConfig = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER,process.env.DB_PASSWORD , {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, 
  });

module.exports = dbConfig;
  