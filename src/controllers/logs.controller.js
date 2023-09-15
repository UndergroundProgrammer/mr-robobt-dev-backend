const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { LogsService } = require("../services");
const { searchQueryConverter } = require("../utils/searchQueryConverter");

const addLog = catchAsync(async (req, res) => {
  const log = await LogsService.addLog(req.body);
  if (!log) {
    throw new ApiError(500, "Something went wrong");
  }
  res.status(httpStatus.OK).send(log);
});
const getAllLogs = catchAsync(async (req, res) => {
  let filter = pick(req.query, ["search", "email"]);
  if (filter.search) {
    let searchQuery = searchQueryConverter(filter.search);
    filter = {
      ...filter,
      ...searchQuery,
    };
    delete filter["search"];
  }
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const logs = await LogsService.getLogs(filter, options);
  if (!logs) {
    throw new ApiError(httpStatus.NOT_FOUND, "Something went wrong");
  }
  res.status(httpStatus.OK).send(logs);
});
const deleteLog = catchAsync(async (req, res) => {
  const log = await LogsService.deleteLog(req.params.logId);
  res.status(httpStatus.OK).send({
    message: "Log deleted successfully!",
  });
});
const updateLog = catchAsync(async (req, res) => {
  const log = await LogsService.updateLog(req.params.logId, req.body);
  res.status(httpStatus.OK).send(log);
});
const getLog = catchAsync(async (req, res) => {
  const log = await LogsService.updateLog(req.params.logId);
  res.status(httpStatus.OK).send(log);
});
module.exports = {
  addLog,
  getAllLogs,
  updateLog,
  deleteLog,
  getLog,
};
