const express = require("express");
const logger = require("../config/logger/logger");

const dotenv = require("dotenv");

const Vehicle = require("../models/vehicleModel");
const { v4: uuidv4 } = require('uuid');

dotenv.config();

exports.createVehicle = async (data) => {
  logger.info("VehicleService-------->createVehicle-------->Start");

  try {
    const {
      user_id,
      vehicle_brand,
      vehicle_model,
      vehicle_plate_no,
      vehicle_color,
      vehicle_type,
    } = data;

    const vehicle_id =  uuidv4();

    const newVehicle = await Vehicle.create({
      vehicle_id,
      user_id,
      vehicle_brand,
      vehicle_model,
      vehicle_plate_no,
      vehicle_color,
      vehicle_type,
    });

    logger.info("VehicleService-------->createVehicle-------->End");
    return 'added'
  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
};

exports.getAllVehicles = async () => {
  logger.info("VehicleService-------->getAllVehicles-------->Start");

  try {
    const vehicles = await Vehicle.findAll();

    logger.info("VehicleService-------->getAllVehicles-------->End");
    return vehicles;
  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
};

exports.getSingleVehicle = async (id) => {
  logger.info("VehicleService-------->getSingleVehicle-------->Start");

  try {
    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      return 'vehicle_not_found';
    }

    logger.info("VehicleService-------->getSingleVehicle-------->End");
    return vehicle;
  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
};

exports.getAllVehiclesOfUser = async (user_id) => {
  logger.info("VehicleService-------->getAllVehiclesOfUser-------->Start");
  try {
    const vehicles = await Vehicle.findAll({
      where: { user_id: user_id },
    });

    logger.info("VehicleService-------->getAllVehiclesOfUser-------->End");

    return vehicles;
  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
};

exports.deleteVehicle = async (id) => {
  logger.info("VehicleService-------->deleteVehicle-------->Start");

  try {
    const deletedRows = await Vehicle.destroy({
      where: { vehicle_id: id },
    });

    if (deletedRows > 0) {
      logger.info("VehicleService-------->deleteVehicle-------->End");
      return 'deleted';
    } else {
      return 'vehicle_not_found'
    }
  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
};

exports.updateVehicle = async (id, data) => {
  logger.info("VehicleService-------->updateVehicle-------->Start");

  const {
    vehicle_brand,
    vehicle_model,
    vehicle_plate_no,
    vehicle_color,
    vehicle_type,
  } = data;

  try {
    const updatedRows = await Vehicle.update(
      {
        vehicle_brand: vehicle_brand,
        vehicle_model: vehicle_model,
        vehicle_plate_no: vehicle_plate_no,
        vehicle_color: vehicle_color,
        vehicle_type: vehicle_type,
      },
      {
        where: { vehicle_id: id },
      }
    );

    if (updatedRows[0] > 0) {
      logger.info("VehicleService-------->updateVehicle-------->End");
      return 'updated';
    } else {
      return 'vehicle_not_found';
    }
  } catch (error) {
    logger.error("Error : " + err.message);

    throw error;
  }
};
