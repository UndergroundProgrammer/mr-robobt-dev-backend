const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Logs } = require("../models");
const addLog = async (logData) => {
  const log = await Logs.create(logData);
  if (!log) {
    throw new ApiError(500, "Something went wrong");
  }
  return log;
};
const getLogs = async (filter, options) => {
  const logs = await Logs.paginate(filter, options);
  if (!logs) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Log Found!");
  }
  return logs;
};
const updateLog = async (itemId, newitem) => {
  const log = await getLogById(itemId);
  Object.assign(log, newitem);
  return log.save();
};
const deleteLog = async (itemId) => {
  const log = await Logs.findByIdAndDelete(itemId);
  if (!log) throw new ApiError(httpStatus.NOT_FOUND, "Log not Found");
  return true;
};
const getLogById = async (itemId) => {
  const log = await Logs.findById(itemId);
  if (!log) throw new ApiError(httpStatus.NOT_FOUND, "Log not found!");
  return log;
};
module.exports = {
  addLog,
  getLogs,
  getLogById,
  deleteLog,
  updateLog,
};
