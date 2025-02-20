const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config/db/dbConfig.js');

const Notification = sequelize.define('Notification', {
  
  notification_id: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  user_id: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING(100),
    allowNull: false,
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

module.exports = Notification;