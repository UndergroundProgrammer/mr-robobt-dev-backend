const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { CompanyStats } = require("../models");
const addState = async (stateData) => {
  const state = await CompanyStats.create(stateData);
  if (!state) {
    throw new ApiError(500, "Something went wrong");
  }
  return state;
};
const getState = async () => {
  const state = await CompanyStats.find();
  if (!state) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Record Found!");
  }
  return state;
};
const updateState = async (itemId, newitem) => {
  const state = await getStateById(itemId);
  Object.assign(state, newitem);
  return state.save();
};
const deleteState = async (itemId) => {
  const state = await CompanyStats.findByIdAndDelete(itemId);
  if (!state) throw new ApiError(httpStatus.NOT_FOUND, "Record not Found");
  return true;
};
const getStateById = async (itemId) => {
  const state = await CompanyStats.findById(itemId);
  if (!state) throw new ApiError(httpStatus.NOT_FOUND, "Record not found!");
  return state;
};
module.exports = {
  addState,
  getState,
  getStateById,
  deleteState,
  updateState,
};
