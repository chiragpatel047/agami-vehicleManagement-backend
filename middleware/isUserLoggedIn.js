const isUserLoggedIn = (req,res,next)=>{
const sendResponse = require('../utility/responseUtils');

    if(req.user){
        next();
    }else{
        sendResponse(res,401,{message : "Unauthorized access"});
    }

}

module.exports = isUserLoggedIn;