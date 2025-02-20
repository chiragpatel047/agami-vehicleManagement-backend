const express = require('express');
const userService = require('../service/userService');
const sendResponse = require('../utility/responseUtils.js')

exports.createUser = async (req, res) => {

  try {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
      return sendResponse(res,200,(req.t('validation_failed')));
    }

    const data = { name, email, password };
    const response = await userService.createUser(data);
  
    sendResponse(res,200,response);

  } catch (error) {
    console.log(error.message);
    sendResponse(res,400, (req.t('signup_failed')));
  }
}


exports.loginUser = async (req, res) => {

  try {

    const email = req.body.email;
    const password = req.body.password;
  
    if (!email || !password) {
      return sendResponse(res,200,(req.t('validation_failed')));
    }

    const data = { email, password };
    const response = await userService.loginUser(data);

    if(response==='user_not_found'){
      sendResponse(res,404,(req.t(response)));
    }else if(response==='invalid_password'){
      sendResponse(res,200,(req.t(response)));
    }else{
      sendResponse(res,200,response);
    }

  } catch (error) {
    sendResponse(res,400, (req.t('login_failed')));
  }
}

exports.getAllUsers = async (req, res) => {

  try {
    const response = await userService.getAllUsers();
    
    if (response.length === 0) {
      return sendResponse(res,404,(req.t('no_data')))
    }
    sendResponse(res,200,response);
  } catch (error) {
    sendResponse(res,400, (req.t('fetch_failed')));
  }
}

exports.getSingleUser = async (req, res) => {

  try {

    const id = req.params.id;
    const response = await userService.getSingleUser(id);

    if(response==='user_not_found'){
      sendResponse(res,404,(req.t(response)));
    }else{
      sendResponse(res,200,response)
    }

  } catch (error) {
    sendResponse(res,400,(req.t('fetch_failed')));
  }
}

exports.updateUser = async (req, res) => {

  try {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
  
    if (!name || !email || !phone_no) {
      return sendResponse(res,200,(req.t('validation_failed')));
    }
  
    const data = { name, email, phone_no };
    const response = await userService.updateUser(id, data);

    sendResponse(res,200,(req.t(response)));

  } catch (error) {
    sendResponse(res,400,(req.t('update_fail')));
  }
}

exports.deleteUser = async (req, res) => {

  try {
   
    const id = req.params.id;
    const response = await userService.deleteUser(id);

    sendResponse(res,200,(req.t(response)));
    
  } catch (error) {
    sendResponse(res,400,(req.t('delete_fail')));
  }
}

exports.generateNewAccessToken = async (req, res) => {

  try {
   
    const id = req.query.id;
  
    let token = req.headers['authorization'];
    const response = await userService.generateNewAccessToken(id,token);

    sendResponse(res,200,response);

  } catch (error) {
    sendResponse(res,400,{message : "Failed to generate access token"});
  }
}


exports.generateGoogleNewAccessToken = async (req, res) => {

  try {
   
    let token = req.headers['authorization'];
    token = token.split(" ")[1];

    const response = await userService.generateGoogleNewAccessToken(token);

    sendResponse(res,200,response);

  } catch (error) {
    sendResponse(res,400,{message : "Failed to generate access token"});
  }
}

exports.getMechanics = async (req, res) => {

  try {
    const response = await userService.getMechanics();

    if (response.length === 0) {
      return sendResponse(res,404,(req.t('no_data')))
    }
    sendResponse(res,200,response);
  } catch (error) {
    sendResponse(res,400, (req.t('fetch_failed')));
  }
}

exports.updateUserType = async (req, res) => {

  try {
    const id = req.params.id;
    const userType = req.body.userType;
  
    if (!userType) {
      return sendResponse(res,200,(req.t('validation_failed')));
    }
  
    const data = { userType};
  
    const response = await userService.updateUserType(id, data);
    sendResponse(res,200,(req.t(response)));

  } catch (error) {
    sendResponse(res,400,(req.t('update_fail')));
  }
}



exports.createAdmin = async (req, res) => {

  try {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
      return sendResponse(res,200,(req.t('validation_failed')));
    }

    const data = { name, email, password };
    const response = await userService.createAdmin(data);
  
    sendResponse(res,200,response);

  } catch (error) {
    console.log(error.message);
    sendResponse(res,400, (req.t('signup_failed')));
  }
}

exports.getAllAdmins = async (req, res) => {

  try {
    const response = await userService.getAllAdmins();
    
    if (response.length === 0) {
      return sendResponse(res,404,(req.t('no_data')))
    }
    sendResponse(res,200,response);
  } catch (error) {
    sendResponse(res,400, (req.t('fetch_failed')));
  }
}

exports.getAllUserNotifications = async (req, res) => {
  try {
    const user_id = req.query.user_id;

    const response = await userService.getAllUserNotifications(
      user_id
    );
    sendResponse(res, 200, response);
  } catch (error) {
    sendResponse(res, 400, req.t("fetch_failed"));
  }
};