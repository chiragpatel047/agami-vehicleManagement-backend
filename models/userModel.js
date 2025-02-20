const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config/db/dbConfig.js');

const User = sequelize.define('User', {
  
  user_id: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  userType : {
    type: DataTypes.ENUM('User', 'Mechanic','Admin'),
    allowNull: true,
  },
  accessToken: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  refreshToken: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false, 
 });

module.exports = User;