const express = require('express');
const { app, server, io } = require('./config/server.js');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("../PRACTICAL_1/routes/userRoutes");
const vehicleRoutes = require("../PRACTICAL_1/routes/vehicleRoutes");
const maintenanceRoutes = require("../PRACTICAL_1/routes/maintenanceRoutes");
const requestFilter = require("./middleware/requestFilter");
const displayRequest = require("./middleware/incomingRequestDisplay.js");
const connectRedis = require('./config/redis.js');
const userSocket = require('./sockets/userSocket.js');

app.use(cors());

dotenv.config();

app.use(bodyParser.json());
app.use(express.json());

const verifyAccessToken = require("./middleware/verifyAccessToken.js");


const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger/swagger.js");

const sequelize = require("../PRACTICAL_1/config/db/dbConfig.js");
const User = require("../PRACTICAL_1/models/userModel.js");
const Vehicle = require("../PRACTICAL_1/models/vehicleModel.js");
const Maintenance = require("../PRACTICAL_1/models/maintenanceModel.js");
const Notification = require("../PRACTICAL_1/models/notificationModel.js");

const i18nextConfig = require("./config/language.js");
const i18Middleware = require("i18next-http-middleware");

const passport = require('../PRACTICAL_1/config/signWithGoogleConfig.js');
const session = require('express-session');


const i18next = i18nextConfig();
app.use(i18Middleware.handle(i18next));

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to MySQL database has been established successfully."
    );

    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();


app.use(session({secret : "cat"}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//userSocket(io);

app.use("/api/v1", userRoutes);

app.use(verifyAccessToken);

app.use("/api/v1", vehicleRoutes);
app.use("/api/v1", maintenanceRoutes);

// let httpServer;

// if (process.env.NODE_ENV === 'Prod') {
//   const privateKey = fs.readFileSync('./certificates/helpnode.key', 'utf8');
//   const certificate = fs.readFileSync('./certificates/helpnode.crt', 'utf8');
//   const credentials = {
//   key: privateKey,
//   cert: certificate
//   };
//   httpServer = https.createServer(credentials, app);
// } else {
//   httpServer = http.createServer(app);
// }

server.listen(process.env.PORT, async () => {
  await connectRedis(io);
  console.log("server started at port : " + process.env.PORT);
});
