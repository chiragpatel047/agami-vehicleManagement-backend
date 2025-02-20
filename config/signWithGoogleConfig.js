const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const localStorage = require("../utility/localStorageUtils.js");
const User = require("../models/userModel.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/v1/google/callback",
      scope: ["profile", "email"],
      prompt: "consent",
      accessType: "offline",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;

      const [user, created] = await User.findOrCreate({
        where: { user_id: id },
        defaults: {
          user_id: id,
          name: displayName,
          email: email,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });

      console.log("AccessToken : " + accessToken);
      console.log("RefreshToken : " + refreshToken);

      console.log(user.dataValues);
      
      let userType;
      let isNewUser;

      if (created) {
        //console.log("New user created:", user);
        isNewUser = true;
        userType= "";

      } else {
        //console.log("User already exists:", user);
        isNewUser = false;
        userType = user.dataValues.userType
      }

      const userData = {
        userId : id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userType :userType,
        isNewUser
    }

      return done(null, userData);
    }
  )
);

passport.serializeUser(function (userData, done) {
  return done(null, userData);
});

passport.deserializeUser(function (userData, done) {
  return done(null, userData);
});

module.exports = passport;
