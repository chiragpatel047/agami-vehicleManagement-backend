const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config/db/dbConfig.js');
const User = require('../models/userModel.js');
const Vehicle =  require('../models/vehicleModel.js');

const Maintenance = sequelize.define('Maintenance', {
    record_id: {
        type: Sequelize.STRING(100),
        primaryKey: true
      },
      user_id: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      vehicle_id: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      mechanic_id: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('Pending', 'In-progress', 'Done'),
        defaultValue  : "Pending",
        allowNull: false
      },      
      maintenance_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING(1000),
        allowNull: true
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      }
}, {
    timestamps: false, 
   });


module.exports = Maintenance;