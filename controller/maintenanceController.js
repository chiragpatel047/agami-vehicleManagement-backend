const express = require("express");
const maintenanceService = require("../service/maintenanceService");
const sendResponse = require("../utility/responseUtils");

exports.createMaintenance = async (req, res) => {
  try {

    const user_id = req.body.user_id;
    const vehicle_id = req.body.vehicle_id;
    const maintenance_date = req.body.maintenance_date;
    const description = req.body.description;

    if (
      !user_id ||
      !vehicle_id ||
      !maintenance_date ||
      !description 
    ) {
      return sendResponse(res, 200, req.t("validation_failed"));
    }

    const data = {
      user_id,
      vehicle_id,
      maintenance_date,
      description
    };

    const response = await maintenanceService.createMaintenance(data);
    sendResponse(res, 200, req.t(response));
  } catch (error) {
    sendResponse(res, 400, req.t("add_fail"));
  }
};

exports.getAllMaintenances = async (req, res) => {
  try {
    const response = await maintenanceService.getAllMaintenances();
    sendResponse(res, 200, response);
  } catch (error) {
    sendResponse(res, 400, req.t("fetch_failed"));
  }
};

exports.getSingleMaintenance = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await maintenanceService.getSingleMaintenance(id);
    if (response === "maintenance_not_found") {
      sendResponse(res, 200, (req.t(response)));
    }else{
      sendResponse(res, 200, response);
    }
  } catch (error) {
    sendResponse(res, 400, req.t("fetch_failed"));
  }
};

exports.getAllMaintenancesOfVehicle = async (req, res) => {
  try {
    const vehicle_id = req.query.vehicle_id;

    const response = await maintenanceService.getAllMaintenancesOfVehicle(
      vehicle_id
    );
    sendResponse(res, 200, response);
  } catch (error) {
    sendResponse(res, 400, req.t("fetch_failed"));
  }
};

exports.getAllMaintenancesOfUser = async (req, res) => {
  try {
    const user_id = req.query.user_id;


    const response = await maintenanceService.getAllMaintenancesOfUser(
      user_id
    );
    sendResponse(res, 200, response);
  } catch (error) {
    sendResponse(res, 400, req.t("fetch_failed"));
  }
};

exports.getAllMaintenancesOfMechanic = async (req, res) => {
  try {
    const mechanic_id = req.query.mechanic_id;
    const status = req.query.status;


    const response = await maintenanceService.getAllMaintenancesOfMechanic(
      mechanic_id,status
    );
    sendResponse(res, 200, response);
  } catch (error) {
    sendResponse(res, 400, req.t("fetch_failed"));
  }
};

exports.updateMaintenance = async (req, res) => {
  try {
    
    const id = req.params.id;
    const maintenance_date = req.body.maintenance_date;
    const description = req.body.description;
    const cost = req.body.cost;
    const service_center = req.body.service_center;

    if (!maintenance_date || !description || !cost || !service_center) {
      return sendResponse(res, 200, req.t("validation_failed"));
    }

    const data = { maintenance_date, description, cost, service_center };

    const response = await maintenanceService.updateMaintenance(id, data);
    sendResponse(res, 200, (req.t(response)));
  } catch (error) {
    sendResponse(res, 400, req.t("update_fail"));
  }
};

exports.deleteMaintenance = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await maintenanceService.deleteMaintenance(id);
    sendResponse(res, 200, (req.t(response)));
  } catch (error) {
    sendResponse(res, 400, req.t("delete_fail"));
  }
};


exports.getAllMaintenancesBasedOnStatus = async (req, res) => {
  try {
    const status = req.query.status;

    const response = await maintenanceService.getAllMaintenancesBasedOnStatus(status);
    sendResponse(res, 200, response);
  } catch (error) {
    sendResponse(res, 400, req.t("fetch_failed"));
  }
};

exports.assignToMechanic = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.body.user_id;
    const mechanic_id = req.body.mechanic_id;

    if (!mechanic_id || !user_id) {
      return sendResponse(res, 200, req.t("validation_failed"));
    }

    const data = { user_id,mechanic_id };

    const response = await maintenanceService.assignToMechanic(id, data);
    sendResponse(res, 200,response);

  } catch (error) {
    sendResponse(res, 400, req.t("update_fail"));
  }

};

exports.maintenanceCompleted = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const id = req.params.id;
    const cost = req.body.cost;

    if (!cost || !user_id) {
      return sendResponse(res, 200, req.t("validation_failed"));
    }

    const data = { cost,user_id };

    const response = await maintenanceService.maintenanceCompleted(id, data);
    sendResponse(res, 200,response);

  } catch (error) {
    sendResponse(res, 400, req.t("update_fail"));
  }

};
