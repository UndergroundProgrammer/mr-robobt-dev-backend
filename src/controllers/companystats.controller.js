const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { CompanyStatsService } = require("../services");

const addState = catchAsync(async (req, res) => {
  const state = await CompanyStatsService.addState(req.body);
  if (!state) {
    throw new ApiError(500, "Something went wrong");
  }
  res.status(httpStatus.OK).send(state);
});
const getAllState = catchAsync(async (req, res) => {
  const stats = await CompanyStatsService.getState(req.body);
  if (!stats) {
    throw new ApiError(httpStatus.NOT_FOUND, "Something went wrong");
  }
  res.status(httpStatus.OK).send(stats);
});
const deleteState = catchAsync(async (req, res) => {
  const state = await CompanyStatsService.deleteState(req.params.stateId);
  res.status(httpStatus.OK).send({
    message: "Record deleted successfully!",
  });
});
const updateState = catchAsync(async (req, res) => {
  const state = await CompanyStatsService.updateState(
    req.params.stateId,
    req.body
  );
  res.status(httpStatus.OK).send(state);
});
const getState = catchAsync(async (req, res) => {
  const state = await CompanyStatsService.updateState(req.params.stateId);
  res.status(httpStatus.OK).send(state);
});
module.exports = {
  addState,
  getAllState,
  updateState,
  deleteState,
  getState,
};
