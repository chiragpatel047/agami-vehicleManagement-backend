const express = require("express");
const vehicleRoutes = express.Router();
const requestFilter = require('../middleware/requestFilter');
const isUserLoggedIn = require('../middleware/isUserLoggedIn.js');
const verifyAccessToken = require('../middleware/verifyAccessToken.js')

const vehicleController = require('../controller/vehicleController');

/**
 * @swagger
 * /api/v1/vehicle:
 *   post:
 *     summary: Add new vehicle
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     tags: [Vehicles]
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
 *               vehicle_brand:
 *                 type: string
 *                 description: Vehicle brand name
 *               vehicle_model:
 *                 type: string
 *                 description: Vehicle model name
 *               vehicle_plate_no:
 *                 type: string
 *                 description: Vehicle plate number
 *               vehicle_color:
 *                 type: string
 *                 description: Vehicle color
 *               vehicle_type:
 *                 type: string
 *                 description: Vehicle Type
 *     responses:
 *       200:
 *         description: Vehicle Added successfully
 */
vehicleRoutes.post("/vehicle",vehicleController.createVehicle);

/**
 * @swagger
 * /api/v1/vehicles:
 *   get:
 *     summary: Retrieve a list of vehicles
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: A list of vehicles
 */
vehicleRoutes.get("/vehicles",vehicleController.getAllVehicles);

/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   get:
 *     summary: Retrieve vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the vehicle
 *     responses:
 *       200:
 *         description: vehicle details
 */
vehicleRoutes.get("/vehicles/:id",vehicleController.getSingleVehicle);

/**
 * @swagger
 * /api/v1/vehicle/{id}:
 *   put:
 *     summary: Update a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the vehicle to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicle_brand:
 *                 type: string
 *                 description: New brand for the vehicle
 *               vehicle_model:
 *                 type: string
 *                 description: New model for the vehicle
 *               vehicle_plate_no:
 *                  type: string
 *                  description: New plate number for the vehicle
 *               vehicle_color:
 *                  type: string
 *                  description: New color for the vehicle
 *               vehicle_type:
 *                  type: string
 *                  description: New type for the vehicle
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 */
vehicleRoutes.put("/vehicle/:id",vehicleController.updateVehicle);


/**
 * @swagger
 * /api/v1/vehicle/{id}:
 *   delete:
 *     summary: Delete vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the vehicle to delete
 *     responses:
 *       200:
 *         description: vehicle deleted successfully
 */
vehicleRoutes.delete("/vehicle/:id",vehicleController.deleteVehicle);


/**
 * @swagger
 * /api/v1/user/vehicles:
 *   get:
 *     summary: Retrieve all vehicles of user
 *     tags: [Vehicles]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: all vehicles of the user
 */
vehicleRoutes.get("/user/vehicles",vehicleController.getAllVehiclesOfUser);


module.exports = vehicleRoutes;
