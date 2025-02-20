const express = require("express");
const maintenanceRoutes = express.Router();
const requestFilter = require('../middleware/requestFilter');
const isUserLoggedIn = require('../middleware/isUserLoggedIn.js');

const maintenanceController = require('../controller/maintenanceController');



/**
 * @swagger
 * /api/v1/maintenance:
 *   post:
 *     summary: Add new maintenance record
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     tags: [Maintenance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: User's id
 *               vehicle_id:
 *                 type: string
 *                 description: Vehicle's id
 *               maintenance_date:
 *                 type: string
 *                 description: Date of maintenance
 *               description:
 *                 type: string
 *                 description: Description about maintenance
 *     responses:
 *       200:
 *         description: Maintenance record added successfully
 */
maintenanceRoutes.post("/maintenance",maintenanceController.createMaintenance);


/**
 * @swagger
 * /api/v1/maintenances:
 *   get:
 *     summary: Retrieve a list of maintenance
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     tags: [Maintenance]
 *     responses:
 *       200:
 *         description: A list of maintenance
 */
maintenanceRoutes.get("/maintenances",maintenanceController.getAllMaintenances);

/**
 * @swagger
 * /api/v1/maintenances/{id}:
 *   get:
 *     summary: Retrieve maintenance by ID
 *     tags: [Maintenance]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the maintenance
 *     responses:
 *       200:
 *         description: maintenance details
 */
maintenanceRoutes.get("/maintenances/:id",maintenanceController.getSingleMaintenance);

/**
 * @swagger
 * /api/v1/maintenance/{id}:
 *   put:
 *     summary: Update a maintenance by ID
 *     tags: [Maintenance]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the maintenance to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maintenance_date:
 *                 type: string
 *                 description: New maintenace date for the vehicle
 *               description:
 *                 type: string
 *                 description: New description of maintenance
 *               cost:
 *                  type: integer
 *                  description: New maintenance cost of vehicle
 *               service_center:
 *                  type: string
 *                  description: New service center name for the maintenance
 *     responses:
 *       200:
 *         description: Maintenance record updated successfully
 */
maintenanceRoutes.put("/maintenance/:id",maintenanceController.updateMaintenance);

/**
 * @swagger
 * /api/v1/maintenance/{id}:
 *   delete:
 *     summary: Delete maintenance by ID
 *     tags: [Maintenance]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the maintenance to delete
 *     responses:
 *       200:
 *         description: maintenance deleted successfully
 */
maintenanceRoutes.delete("/maintenance/:id",maintenanceController.deleteMaintenance);

/**
 * @swagger
 * /api/v1/vehicle/maintenances:
 *   get:
 *     summary: Retrieve all maintenance records of vehicle
 *     tags: [Maintenance]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: query
 *         name: vehicle_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the maintenance 
 *     responses:
 *       200:
 *         description: all maintenance records of the vehicle
 */
maintenanceRoutes.get("/vehicle/maintenances",maintenanceController.getAllMaintenancesOfVehicle);


/**
 * @swagger
 * /api/v1/user/maintenances:
 *   get:
 *     summary: Retrieve all maintenance records of user
 *     tags: [Maintenance]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the maintenance 
 *     responses:
 *       200:
 *         description: all maintenance records of the user
 */
maintenanceRoutes.get("/user/maintenances",maintenanceController.getAllMaintenancesOfUser);


/**
 * @swagger
 * /api/v1/mechanic/maintenances:
 *   get:
 *     summary: Retrieve all maintenance records of mechanic
 *     tags: [Maintenance]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: query
 *         name: mechanic_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the mechanic 
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: status of maintenance 
 *     responses:
 *       200:
 *         description: all maintenance records of the mechanic
 */
maintenanceRoutes.get("/mechanic/maintenances",maintenanceController.getAllMaintenancesOfMechanic);

/**
 * @swagger
 * /api/v1/maintenance/assign/{id}:
 *   put:
 *     summary: Assign maintenance to mechanic
 *     tags: [Maintenance]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the maintenance record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mechanic_id:
 *                 type: string
 *                 description: Mechanic's id
 *               user_id:
 *                 type: string
 *                 description: User's id
 *     responses:
 *       200:
 *         description: Assigned successfully
 */
maintenanceRoutes.put("/maintenance/assign/:id",maintenanceController.assignToMechanic);


/**
 * @swagger
 * /api/v1/maintenance/completed/{id}:
 *   put:
 *     summary: Mark maintenace as completed
 *     tags: [Maintenance]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the maintenance record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cost:
 *                 type: integer
 *                 description: Cost of maintenance
 *     responses:
 *       200:
 *         description: Mark as completed
 */
maintenanceRoutes.put("/maintenance/completed/:id",maintenanceController.maintenanceCompleted);


/**
 * @swagger
 * /api/v1/maintenanceByStatus:
 *   get:
 *     summary: Retrieve all maintenance records based on status
 *     tags: [Maintenance]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the maintenance 
 *     responses:
 *       200:
 *         description: all maintenance records of the vehicle based on status
 */
maintenanceRoutes.get("/maintenanceByStatus",maintenanceController.getAllMaintenancesBasedOnStatus);



module.exports = maintenanceRoutes;