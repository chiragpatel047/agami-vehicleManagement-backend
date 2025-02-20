const express = require('express');

const sendResponse = (res, statusCode, responseData) => {

    const response = {
        status: statusCode,
        response : responseData
      };
      res.status(statusCode).json(response);
  };
  
  module.exports = sendResponse;