const express = require('express');

const jwt = require('jsonwebtoken');
const passwordUtils = require('../utility/passwordUtils');
const dotenv = require('dotenv');
const logger = require('../config/logger/logger');
const { v4: uuidv4 } = require('uuid');

const axios = require("axios");

const User = require('../models/userModel');
const Notification = require("../models/notificationModel");

dotenv.config();

exports.getAllUsers = async () => {

  logger.info("UserService-------->getAllUsers-------->Start");

  try {

    const users = await User.findAll();
    logger.info("UserService-------->getAllUsers-------->End");
    return users;
  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
}

exports.getSingleUser = async (id) => {

  logger.info("UserService-------->getSingleUser-------->Start");

  try {

    const user = await User.findByPk(id);

    if (!user) {
      return 'user_not_found';
    }

    logger.info("UserService-------->getSingleUser-------->End");
    return user;
    
  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
};

exports.createUser = async (data) => {

  logger.info("UserService-------->createUser-------->Start");

  try {

    const { name, email, password } = data;
    const encryptedPassword = await passwordUtils.hashPassword(password);

    const user_id =  uuidv4();
    const accessToken = jwt.sign({ user_id :user_id }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });
    const refreshToken = jwt.sign({ user_id :user_id }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY,{expiresIn : process.env.JWT_REFRESH_EXPIRY});


    const newUser = await User.create({
      user_id : user_id,
      name: name,
      email: email,
      password: encryptedPassword,
      accessToken : accessToken,
      refreshToken : refreshToken
    });

    logger.info("UserService-------->createUser-------->End");

    return {user : newUser};

  } catch (err) {
    console.log("FROM user service : " + err);
    logger.error("Error : " + err.message);
    throw err;
  }
}

exports.loginUser = async (data) => {

  logger.info("UserService-------->loginUser-------->Start");
  try {

    const { email, password } = data;
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return 'user_not_found';
    }

    const isPasswordValid = await passwordUtils.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return 'invalid_password';
    }

    const accessToken = jwt.sign({ user_id : user.user_id }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });
    const refreshToken = jwt.sign({ user_id : user.user_id }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY ,{expiresIn : process.env.JWT_REFRESH_EXPIRY});

    const [update] = await User.update({
      accessToken,
      refreshToken
    }, {
      where: {
        user_id: user.user_id,
      },
    });


    logger.info("UserService-------->loginUser-------->End");

    return {message : "Login successfully" , user : {user_id : user.user_id,userType : user.userType, accessToken : accessToken,refreshToken : refreshToken}};

  } catch (err) {
    console.log(err);
    logger.error("Error : " + err.message);
    throw err;
  }
};

exports.updateUser = async (id, data) => {

  logger.info("UserService-------->updateUser-------->Start");
  const { name, email } = data;

  try {

    const [updatedCount] = await User.update({
      name,
      email
    }, {
      where: {
        user_id: id,
      },
    });

    if (updatedCount === 0) {
      return 'user_not_found';
    }

    return 'updated';

  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
}



exports.updateUserType = async (id, data) => {

  logger.info("UserService-------->updateUserType-------->Start");
  const { userType } = data;

  try {

    const [updatedCount] = await User.update({
      userType : userType
    }, {
      where: {
        user_id: id,
      },
    });

    if (updatedCount === 0) {
      return 'user_not_found';
    }

    return 'updated';

  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
}

exports.deleteUser = async (id) => {

  logger.info("UserService-------->deleteUser-------->Start");

  try {
    const deletedCount = await User.destroy({ 
      where: {
        user_id: id,
      },
    });

    if (deletedCount === 0) {
      return 'user_not_found';
    }

    logger.info("UserService-------->deleteUser-------->End");

    return 'deleted';

  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
}

exports.userChat = async (id) => {

  logger.info("UserService-------->userChat-------->Start");

  try {
    const deletedCount = await User.destroy({
      where: {
        user_id: id,
      },
    });

    if (deletedCount === 0) {
      return 'user_not_found';
    }

    logger.info("UserService-------->userChat-------->End");

    return '';

  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }  

}

exports.generateNewAccessToken = async (user_id,refreshToken) => {

  logger.info("UserService-------->generateNewRefreshToken-------->Start");

  try {

    const token = refreshToken.split(" ")[1];
    jwt.verify(token,process.env.JWT_REFRESH_TOKEN_SECRET_KEY);
    
    const newAccessToken = jwt.sign({ user_id :user_id }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });

    logger.info("UserService-------->generateNewRefreshToken-------->End");

    const [update] = await User.update({
      accessToken : newAccessToken
    }, {
      where: {
        user_id: user_id,
      },
    });

    return newAccessToken;

  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
}

exports.generateGoogleNewAccessToken = async (refreshToken)=> {

    try {
        const response = await axios.post("https://oauth2.googleapis.com/token", null, {
            params: {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                refresh_token: refreshToken,
                grant_type: "refresh_token",
            },
        });

        const [update] = await User.update({
          accessToken : response.data.access_token
        }, {
          where: {
            refreshToken: refreshToken,
          },
        });

        return response.data.access_token;

    } catch (error) {
        console.error(" Error refreshing token:", error.response?.data || error.message);
        return null;
    }
}

exports.getMechanics = async () => {
  logger.info(
    "UserService-------->getMechanics-------->Start"
  );

  try {
    const response = await User.findAll({
      where: { userType: "Mechanic" },
    });
  
    logger.info(
      "UserService-------->getMechanics-------->End"
    );
  
    return response;
  } catch (err) {
    logger.error("Error : " + err.message);

    throw err;
  }
};



exports.createAdmin = async (data) => {

  logger.info("UserService-------->createAdmin-------->Start");

  try {

    const { name, email, password } = data;
    const encryptedPassword = await passwordUtils.hashPassword(password);

    const user_id =  uuidv4();
    const accessToken = jwt.sign({ user_id :user_id }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });
    const refreshToken = jwt.sign({ user_id :user_id }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY);


    const newUser = await User.create({
      user_id : user_id,
      name: name,
      email: email,
      password: encryptedPassword,
      userType : "Admin",
      accessToken : accessToken,
      refreshToken : refreshToken
    });

    logger.info("UserService-------->createAdmin-------->End");

    return {user : newUser};

  } catch (err) {
    console.log("FROM user service : " + err);
    logger.error("Error : " + err.message);
    throw err;
  }
}

exports.getAllAdmins = async () => {

  logger.info("UserService-------->getAllAdmins-------->Start");

  try {

    const users = await User.findAll({
      where : {userType : "Admin"}
    });
    
    logger.info("UserService-------->getAllAdmins-------->End");
    return users;
  } catch (err) {
    logger.error("Error : " + err.message);
    throw err;
  }
}


exports.getAllUserNotifications = async (user_id) => {
  logger.info("MaintenanceService-------->getAllNotifications-------->Start");

  try {
    const notifications = await Notification.findAll(
     { where : {user_id : user_id}}
    );
    logger.info("MaintenanceService-------->getAllNotifications-------->End");

    return notifications;
  } catch (err) {
    console.log(err);
    logger.error("Error : " + err.message);

    throw err;
  }
};
