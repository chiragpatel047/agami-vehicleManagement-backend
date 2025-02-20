const express = require("express");

const dotenv = require("dotenv");
const logger = require("../config/logger/logger");
const Maintenance = require("../models/maintenanceModel");
const Notification = require("../models/notificationModel");
const { v4: uuidv4 } = require("uuid");
const { io } = require("../config/server");
const { where } = require("sequelize");

dotenv.config();

exports.createMaintenance = async (data) => {
  logger.info("MaintenanceService-------->createMaintenance-------->Start");

  const { user_id, vehicle_id, maintenance_date, description } = data;

  const record_id = uuidv4();

  const now = new Date();
  const dateAndTime = now
    .toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " |");

    const msg =
      '{ "message" : "You have new vehicle maintenance request", "title" : "New Request","status" : "Pending","time" : "' +
      dateAndTime +
      '"}';

    const userNamespace = io.of("/users");
    userNamespace.to("admin").emit("user-notification", msg);

  try {

    const newMaintenance = await Maintenance.create({
      user_id: user_id,
      record_id: record_id,
      vehicle_id: vehicle_id,
      maintenance_date: maintenance_date,
      description: description,
    });

    const notification_id1 = uuidv4();

    const newNotification = await Notification.create({
      notification_id: notification_id1,
      user_id: 'admin',
      message: "You have new vehicle maintenance request",
      title: "New Request",
      status: "Pending",
      time: dateAndTime,
    });

    logger.info("MaintenanceService-------->createMaintenance-------->End");

    return "added";
  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
};

exports.getAllMaintenances = async () => {
  logger.info("MaintenanceService-------->getAllMaintenances-------->Start");

  try {
    const maintenances = await Maintenance.findAll();
    logger.info("MaintenanceService-------->getAllMaintenances-------->End");

    return maintenances;
  } catch (err) {
    logger.error("Error : " + err.message);

    throw err;
  }
};

exports.getSingleMaintenance = async (id) => {
  logger.info("MaintenanceService-------->getSingleMaintenance-------->Start");

  try {
    const maintenance = await Maintenance.findByPk(id);

    if (maintenance) {
      logger.info(
        "MaintenanceService-------->getSingleMaintenance-------->End"
      );
      return maintenance;
    } else {
      return "maintenance_not_found";
    }
  } catch (err) {
    logger.error("Error : " + err.message);

    throw err;
  }
};

exports.getAllMaintenancesOfVehicle = async (vehicle_id) => {
  logger.info(
    "MaintenanceService-------->getAllMaintenancesOfVehicle-------->Start"
  );

  try {
    const maintenances = await Maintenance.findAll({
      where: { vehicle_id: vehicle_id },
    });

    logger.info(
      "MaintenanceService-------->getAllMaintenancesOfVehicle-------->End"
    );

    return maintenances;
  } catch (err) {
    logger.error("Error : " + err.message);

    throw err;
  }
};

exports.getAllMaintenancesOfUser = async (user_id) => {
  logger.info(
    "MaintenanceService-------->getAllMaintenancesOfUser-------->Start"
  );

  try {
    const maintenances = await Maintenance.findAll({
      where: { user_id: user_id },
    });

    logger.info(
      "MaintenanceService-------->getAllMaintenancesOfUser-------->End"
    );

    return maintenances;
  } catch (err) {
    logger.error("Error : " + err.message);

    throw err;
  }
};

exports.getAllMaintenancesOfMechanic = async (mechanic_id, status) => {
  logger.info(
    "MaintenanceService-------->getAllMaintenancesOfMechanic-------->Start"
  );

  try {
    const maintenances = await Maintenance.findAll({
      where: { mechanic_id: mechanic_id, status: status },
    });

    logger.info(
      "MaintenanceService-------->getAllMaintenancesOfMechanic-------->End"
    );

    return maintenances;
  } catch (err) {
    logger.error("Error : " + err.message);

    throw err;
  }
};

exports.updateMaintenance = async (id, data) => {
  logger.info("MaintenanceService-------->updateMaintenance-------->Start");

  const { maintenance_date, description, cost, service_center } = data;

  try {
    const updatedRows = await Maintenance.update(
      {
        maintenance_date: maintenance_date,
        description: description,
        cost: cost,
        service_center: service_center,
      },
      {
        where: { record_id: id },
      }
    );

    if (updatedRows[0] > 0) {
      logger.info("MaintenanceService-------->updateMaintenance-------->End");
      return "updated";
    } else {
      return "maintenance_not_found";
    }
  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
};

exports.deleteMaintenance = async (id) => {
  logger.info("MaintenanceService-------->deleteMaintenance-------->Start");

  try {
    const deletedRows = await Maintenance.destroy({
      where: { record_id: id },
    });

    if (deletedRows > 0) {
      logger.info("MaintenanceService-------->deleteMaintenance-------->End");
      return "deleted";
    } else {
      return "maintenance_not_found";
    }
  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
};

exports.getAllMaintenancesBasedOnStatus = async (status) => {
  logger.info(
    "MaintenanceService-------->getAllMaintenancesBasedOnStatus-------->Start"
  );

  try {
    const maintenances = await Maintenance.findAll({
      where: { status: status },
    });

    logger.info(
      "MaintenanceService-------->getAllMaintenancesBasedOnStatus-------->End"
    );

    return maintenances;
  } catch (err) {
    logger.error("Error : " + err.message);

    throw err;
  }
};

exports.assignToMechanic = async (id, data) => {
  logger.info("MaintenanceService-------->assignToMechanic-------->Start");
  const { user_id, mechanic_id } = data;

  const now = new Date();
  const dateAndTime = now
    .toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " |");

  try {
    const userMsg =
      '{ "message" : "Your request is accepted and vehicle is in service", "title" : "Request Approved","status" : "In-Progress","time" : "' +
      dateAndTime +
      '"}';

      const mechanicMsg =
      '{ "message" : "You have new vehicle maintenance request", "title" : "New Request","status" : "In-Progress","time" : "' +
      dateAndTime +
      '"}';

    const userNamespace = io.of("/users");
    userNamespace.to(user_id).emit("user-notification", userMsg);
    userNamespace.to(mechanic_id).emit("user-notification", mechanicMsg);


    const updatedRows = await Maintenance.update(
      {
        mechanic_id: mechanic_id,
        status: "In-progress",
      },
      {
        where: { record_id: id },
      }
    );

    const notification_id1 = uuidv4();

    const newNotification = await Notification.create({
      notification_id: notification_id1,
      user_id: user_id,
      message: "Your request is accepted and vehicle is in service",
      title: "Request Approved",
      status: "In-Progress",
      time: dateAndTime,
    });

    const notification_id2 = uuidv4();

    const newNotification2 = await Notification.create({
      notification_id: notification_id2,
      user_id: mechanic_id,
      message: "You have new vehicle maintenance request",
      title: "New Request",
      status: "In-Progress",
      time: dateAndTime,
    });

    if (updatedRows[0] > 0) {
      logger.info("MaintenanceService-------->assignToMechanic-------->End");

      return { message: "Assigned successfully" };
    } else {
      return "maintenance_not_found";
    }
  } catch (err) {
    console.log(err);
    logger.error("Error : " + err.message);
    throw err;
  }
};

exports.maintenanceCompleted = async (id, data) => {
  logger.info("MaintenanceService-------->maintenanceCompleted-------->Start");

  const { cost,user_id } = data;
  const notification_id = uuidv4();

  try {
    const now = new Date();
    const dateAndTime = now
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", " |");

    const updatedRows = await Maintenance.update(
      {
        cost: cost,
        status: "Done",
      },
      {
        where: { record_id: id },
      }
    );

    const msg =
      '{ "message" : "Your request is completed, please collect your vehicle", "title" : "Request Completed","status" : "Done","time" : "' +
      dateAndTime +
      '"}';

    const userNamespace = io.of("/users");
    userNamespace.to(user_id).emit("user-notification", msg);

    const newNotification = await Notification.create({
      notification_id: notification_id,
      user_id: user_id,
      message: "Your request is completed, please collect your vehicle",
      title: "Request Completed",
      status: "Done",
      time: dateAndTime,
    });

    if (updatedRows[0] > 0) {
      logger.info(
        "MaintenanceService-------->maintenanceCompleted-------->End"
      );

      return { message: "Mark as completed" };
    } else {
      return "maintenance_not_found";
    }
  } catch (err) {
    console.log(err);
    logger.error("Error : " + err.message);
    throw err;
  }
};
