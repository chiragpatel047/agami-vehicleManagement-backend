const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const logger = require('../config/logger/logger.js')

dotenv.config();

const requestFilter = (req,res,next)=>{
    
    let token = req.headers['authorization'];
    
    try {
        if(token){
            token = token.split(" ")[1];
            jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
        }else{
            return res.json({message : req.t('missing_token')});
        }
        next();

    } catch (error) {
        logger.error("Error: "  + error.message);
        return res.json({message : error.message});
    }


};

module.exports = requestFilter;