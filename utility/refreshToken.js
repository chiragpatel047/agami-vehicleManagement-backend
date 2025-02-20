const axios = require("axios");
require("dotenv").config();

async function refreshAccessToken(refreshToken) {  
    
    try {
        const response = await axios.post("https://oauth2.googleapis.com/token", null, {
            params: {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                refresh_token: refreshToken,
                grant_type: "refresh_token",
            },
        });

        console.log("🔄 New Access Token:", response.data.access_token);
        return {
            accessToken: response.data.access_token,
            expiresIn: response.data.expires_in, // Time in seconds
        };
    } catch (error) {
        console.error("Error refreshing token:", error.response?.data || error.message);
        return null;
    }
}

module.exports = refreshAccessToken;
