const express = require("express");
const userRoutes = express.Router();
const requestFilter = require("../middleware/requestFilter");

const userController = require("../controller/userController");

const passport = require("../config/signWithGoogleConfig.js");
const isUserLoggedIn = require("../middleware/isUserLoggedIn.js");
const localStorage = require("../utility/localStorageUtils.js");
const path = require("path");
const verifyAccessToken = require("../middleware/verifyAccessToken.js");

const userSocket = require('../sockets/userSocket.js');
userSocket();

/**
  @swagger
 * /api/v1/signup:
 *   post:
 *     summary: Create a new user
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
userRoutes.post("/signup", userController.createUser);

/**
 @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login user
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
userRoutes.post("/login", userController.loginUser);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 */
userRoutes.get("/users", verifyAccessToken, userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Retrieve user by ID
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: user details
 */
userRoutes.get("/users/:id", verifyAccessToken, userController.getSingleUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email for the user
 *               phone_no:
 *                  type: string
 *                  description: New phone number for the user
 *     responses:
 *       200:
 *         description: User updated successfully
 */
userRoutes.put("/user/:id", verifyAccessToken, userController.updateUser);



/**
 * @swagger
 * /api/v1/updateUserType/{id}:
 *   put:
 *     summary: Update a userType by ID
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userType:
 *                 type: string
 *                 description: userType
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     responses:
 *       200:
 *         description: User updated successfully
 */
userRoutes.put("/updateUserType/:id", verifyAccessToken, userController.updateUserType);


/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
userRoutes.delete("/user/:id", verifyAccessToken, userController.deleteUser);


/**
 * @swagger
 * /api/v1/user/mechanics:
 *   get:
 *     summary: Retrieve a list of mechanics
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of mechanics
 */
userRoutes.get("/user/mechanics", userController.getMechanics);


/**
  @swagger
 * /api/v1/admin:
 *   post:
 *     summary: Create a new Admin
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Admin created successfully
 *       400:
 *         description: Bad request
 */
  userRoutes.post("/admin", verifyAccessToken, userController.createAdmin);

/**
 * @swagger
 * /api/v1/admins:
 *   get:
 *     summary: Retrieve a list of admins
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of admins
 */
userRoutes.get("/admins", verifyAccessToken, userController.getAllAdmins);
  


/**
 * @swagger
 * /api/v1/user/notifications:
 *   get:
 *     summary: Retrieve user's notifications
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: user details
 */
userRoutes.get("/user/notifications", verifyAccessToken, userController.getAllUserNotifications);


/**
 * @swagger
 * /api/v1/getNewAccessToken:
 *   get:
 *     summary: Generate new access token
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Access token generated successfully
 */
userRoutes.get("/getNewAccessToken", userController.generateNewAccessToken);

/**
 * @swagger
 * /api/v1/getGoogleNewAccessToken:
 *   get:
 *     summary: Generate new google access token
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Access token generated successfully
*/
userRoutes.get("/getGoogleNewAccessToken", userController.generateGoogleNewAccessToken);

userRoutes.get("/usersChat", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

userRoutes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    accessType: "offline",
    prompt: "consent",
  })
);

userRoutes.get("/google/callback",
  passport.authenticate("google",{successRedirect : "/api/v1/protected"})
);

userRoutes.get("/protected", isUserLoggedIn, (req, res) => {
  console.log("req.user :", req.user);
  res.redirect("http://localhost:3000/OAuthCallback?accessToken="+req.user.accessToken+"&userId="+req.user.userId+"&refreshToken="+req.user.refreshToken+"&isNewUser="+req.user.isNewUser+"&userType="+req.user.userType);
});

/**
 *
 * @swagger
 * /api/v1/signin:
 *   get:
 *     summary: Sign in with Google
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Login Successfully
 */
userRoutes.get("/signin", (req, res) => {
  res.send("<a href='/api/v1/auth/google'>Sign in with Google</a>");
});

module.exports = userRoutes;
