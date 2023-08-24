const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { NotificationEmailsService } = require("../services");

const addEmail = catchAsync(async (req, res) => {
  const state = await NotificationEmailsService.addEmail(req.body);
  if (!state) {
    throw new ApiError(500, "Something went wrong");
  }
  res.status(httpStatus.OK).send(state);
});
const getAllEmails = catchAsync(async (req, res) => {
  const stats = await NotificationEmailsService.getEmail(req.body);
  if (!stats) {
    throw new ApiError(httpStatus.NOT_FOUND, "Something went wrong");
  }
  res.status(httpStatus.OK).send(stats);
});
const deleteEmail = catchAsync(async (req, res) => {
  const state = await NotificationEmailsService.deleteEmail(req.params.emailId);
  res.status(httpStatus.OK).send({
    message: "Record deleted successfully!",
  });
});
const updateEmail = catchAsync(async (req, res) => {
  const state = await NotificationEmailsService.updateEmail(
    req.params.emailId,
    req.body
  );
  res.status(httpStatus.OK).send(state);
});
const getEmail = catchAsync(async (req, res) => {
  const state = await NotificationEmailsService.updateEmail(req.params.emailId);
  res.status(httpStatus.OK).send(state);
});
module.exports = {
  addEmail,
  getAllEmails,
  updateEmail,
  deleteEmail,
  getEmail,
};
