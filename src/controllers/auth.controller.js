const httpStatus = require("http-status");
const geoip = require("geoip-country");
const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require("../services");
const config = require("../config/config");
const logger = require("../config/logger");
const ApiError = require("../utils/ApiError");
const { getName } = require("country-list");
const { sendApprovalNotification } = require("../sockets");

const sendInvite = catchAsync(async (req, res) => {
  const invite = await authService.sendSignupInvitation(req.body);
  if (!invite) {
    throw new ApiError(500, "Something went wrong");
  }
  res.status(httpStatus.OK).send({
    message: `Invitation has been sent successfully!`,
  });
});
const register = catchAsync(async (req, res) => {
  const user = await userService.checkEmail(req.body.email);
  if (user) {
    const ip =
      req.headers["cf-connecting-ip"] ||
      req.headers["x-real-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "UNKNOWN";
    const geo = geoip.lookup(ip);
    const country = geo ? getName(geo.country) : "UNKNOWN";
    req.body.country = country;
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(
      req.body
    );
    await emailService.sendVerificationEmail(
      req.body.firstName,
      req.body.email,
      verifyEmailToken
    );
  }

  res.status(httpStatus.OK).send({ message: `Verify your email first` });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query;
  const tokenVerified = await authService.verifyEmail(token);

  let redirectUrl = config.clientUrl;

  if (tokenVerified && tokenVerified.type == "invitation") {
    tokenService.saveRevokedToken(token, tokenVerified.type);
  } else if (tokenVerified && tokenVerified.type == "verifyEmail") {
    const user = await userService.createUser(tokenVerified.sub);
    sendApprovalNotification();
    redirectUrl += `auth/verifyEmail`;
    res.redirect(redirectUrl);
  }
  res.status(200).send({ verifed: true });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = async (req, res) => {
  await authService.logout(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
};

const forgotPassword = catchAsync(async (req, res) => {
  const { resetPasswordToken, username } =
    await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(
    req.body.email,
    username,
    resetPasswordToken
  );
  res.send({ resetPasswordToken });
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.password);
  res.status(httpStatus.CREATED).send("Password Reset Successfully");
});

const googleAuthHandler = catchAsync(async (req, res) => {
  const userData = {
    email: req.user.email,
    username: req.user.displayName,
    birthDate: new Date("02-08-1996"),
  };
  console.log(req.user);

  const user = await userService.googleLogin(userData);
  const tokens = await tokenService.generateAuthTokens(user);
  res
    .status(200)
    .redirect(
      `${config.clientUrl}login?data=${JSON.stringify({ user, tokens })}`
    );
});
const facebookAuthHandler = catchAsync(async (req, res) => {
  const userData = {
    email: req.user.emails[0].value,
    username: `${req.user._json.first_name} ${req.user._json.last_name}`,
    birthDate: req.user._json.birthday
      ? req.user._json.birthday
      : new Date("02-08-1997"),
  };

  const user = await userService.googleLogin(userData);
  const tokens = await tokenService.generateAuthTokens(user);
  res
    .status(200)
    .redirect(
      `${config.clientUrl}login?data=${JSON.stringify({ user, tokens })}`
    );
});
const changePassword = catchAsync(async (req, res) => {
  const user = await userService.changePassword(req.body.userId, req.body);
  res.status(httpStatus.OK).send({
    message: "Password chnaged successfully",
  });
});

module.exports = {
  sendInvite,
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  googleAuthHandler,
  changePassword,
  facebookAuthHandler,
};
