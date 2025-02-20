const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config/db/dbConfig.js');
const User = require('../models/userModel.js');


const Vehicle = sequelize.define('Vehicle', {
    vehicle_id: {
      type: DataTypes.STRING(100),
      primaryKey: true
      },
      user_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      vehicle_brand: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      vehicle_model: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      vehicle_plate_no: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      vehicle_color: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      vehicle_type: {
        type: DataTypes.ENUM('Car', 'Bike', 'Truck', 'Bus'),
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


module.exports = Vehicle;