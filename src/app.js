const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const config = require("./config/config");
const morgan = require("./config/morgan");
const {
  jwtStrategy,
  googleStrategy,
  instagramStrategy,
  facebookStrategy,
} = require("./config/passport");
const { authLimiter } = require("./middlewares/rateLimiter");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const path = require("path");

const faviconPath = path.join(__dirname, "public", "favicon.ico");
const serverRunning = path.join(__dirname, "public", "ServerRunning.png");

const app = express();
// Serve static files from the 'public' directory
app.use(express.static("public"));

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// Serve the favicon.ico file
app.get("/favicon.ico", (req, res) => {
  res.sendFile(faviconPath);
});

// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(xss());

// parse urlencoded request body
app.use(express.urlencoded({ extended: false }));
// parse json request body
app.use(express.json());

app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors

app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
passport.use("google", googleStrategy);
passport.use("instagram", instagramStrategy);
passport.use("facebook", facebookStrategy);
// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
app.get("/", (req, res) => {
  res.sendFile(serverRunning);
});

app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
