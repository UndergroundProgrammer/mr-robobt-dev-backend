const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const verifyCallback = (req, resolve, reject) => async (err, user) => {
  if (err || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'You are not authenticated by google!'));
  }
  req.user = user;
  resolve();
};

const googleAuth = async (req, res, next) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      "google",
      {
        scope: ["email", "profile"],
        session: false,
      },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));

module.exports = googleAuth;
