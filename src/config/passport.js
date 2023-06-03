const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const FacebbokStrategy = require("passport-facebook").Strategy;
const config = require("./config");

const { User } = require("../models");

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const googleOptions = {
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL:
    "https://tripapp-backend.up.railway.app/api/auth/google/callback",
  passReqToCallback: true,
};

const instagramOption = {
  clientID: config.instagram.clientId,
  clientSecret: config.instagram.clientSecret,
  callbackURL:
    "https://tripapp-backend.up.railway.app/api/auth/instagram/callback/",
};
const facebookOptions = {
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
  callbackURL:
    "https://tripapp-backend.up.railway.app/api/auth/facebook/callback",
  profileFields: ["id", "email", "gender", "name", "verified", "birthday"],
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const Callback = (request, accessToken, refreshToken, profile, done) => {
  try {
    done(false, profile);
  } catch (err) {
    done(err, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const googleStrategy = new GoogleStrategy(googleOptions, Callback);
const instagramStrategy = new InstagramStrategy(instagramOption, Callback);
const facebookStrategy = new FacebbokStrategy(facebookOptions, Callback);
module.exports = {
  jwtStrategy,
  googleStrategy,
  instagramStrategy,
  facebookStrategy,
};
