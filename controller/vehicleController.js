const express = require("express");
const vehicleService = require("../service/vehicleService");
const sendResponse = require("../utility/responseUtils");

exports.createVehicle = async (req, res) => {
  
  try {
    const user_id = req.body.user_id;
    const vehicle_brand = req.body.vehicle_brand;
    const vehicle_model = req.body.vehicle_model;
    const vehicle_plate_no = req.body.vehicle_plate_no;
    const vehicle_color = req.body.vehicle_color;
    const vehicle_type = req.body.vehicle_type;

    if (
      !user_id ||
      !vehicle_brand ||
      !vehicle_model ||
      !vehicle_plate_no ||
      !vehicle_color ||
      !vehicle_type
    ) {
      return sendResponse(res, 200, req.t("validation_failed"));
    }

    const data = {
      user_id,
      vehicle_brand,
      vehicle_model,
      vehicle_plate_no,
      vehicle_color,
      vehicle_type,
    };

    const response = await vehicleService.createVehicle(data);

    sendResponse(res, 200, req.t(response));
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, req.t("add_fail"));
  }
};

exports.getSingleVehicle = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await vehicleService.getSingleVehicle(id);
    if (response === "vehicle_not_found") {
      sendResponse(res, 404, req.t(response));
    } else {
      sendResponse(res, 200, response);
    }
  } catch (error) {
    sendResponse(res, 400, req.t("fetch_failed"));
  }
};

exports.getAllVehiclesOfUser = async (req, res) => {
  try {
    const user_id = req.query.user_id;

    const response = await vehicleService.getAllVehiclesOfUser(user_id);
    sendResponse(res, 200, response);
  } catch (error) {
    sendResponse(res, 400, req.t("fetch_failed"));
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    const response = await vehicleService.getAllVehicles();
    sendResponse(res, 200, response);
  } catch (error) {
    sendResponse(res, 400, req.t("fetch_failed"));
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await vehicleService.deleteVehicle(id);
    sendResponse(res, 200, req.t(response));
  } catch (error) {
    sendResponse(res, 400, "Failed to delete vehicle");
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const id = req.params.id;
    const vehicle_brand = req.body.vehicle_brand;
    const vehicle_model = req.body.vehicle_model;
    const vehicle_plate_no = req.body.vehicle_plate_no;
    const vehicle_color = req.body.vehicle_color;
    const vehicle_type = req.body.vehicle_type;

    if (
      !vehicle_brand ||
      !vehicle_model ||
      !vehicle_plate_no ||
      !vehicle_color ||
      !vehicle_type
    ) {
      return sendResponse(res, 200, req.t("validation_failed"));
    }

    const data = {
      vehicle_brand,
      vehicle_model,
      vehicle_plate_no,
      vehicle_color,
      vehicle_type,
    };

    const response = await vehicleService.updateVehicle(id, data);
    sendResponse(res, 200, req.t(response));
  } catch (error) {
    sendResponse(res, 400, "Failed to update vehicle");
  }
};
