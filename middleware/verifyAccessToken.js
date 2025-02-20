const axios = require("axios");
const refreshAccessToken = require("../utility/refreshToken");
const jwt = require("jsonwebtoken");

async function verifyAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const authType = req.headers.auth;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing  token" });
  }
  
  const token = authHeader.split(" ")[1];

  if (authType === "google") {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
      );

      req.user = response.data; // Attach user info to request
      next();

    } catch (error) {
      
      console.log(error);
      return res.status(400).json({ error: "Invalid google access token" });
    }
  } else {
    try {
      const result = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
      next();
    } catch (error) {
      return res.status(400).json({ error: "Invalid token" });
    }
  }
}

module.exports = verifyAccessToken;
