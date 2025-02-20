const logger = require('../config/logger/logger.js');

const displayRequest = (req,res,next)=>{
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
}

module.exports = displayRequest;

