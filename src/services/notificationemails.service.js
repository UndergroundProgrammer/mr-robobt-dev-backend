const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { NotificationEmails } = require("../models");
const addEmail = async (stateData) => {
  const state = await NotificationEmails.create(stateData);
  if (!state) {
    throw new ApiError(500, "Something went wrong");
  }
  return state;
};
const getEmail = async () => {
  const state = await NotificationEmails.find();
  if (!state) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Record Found!");
  }
  return state;
};
const updateEmail = async (itemId, newitem) => {
  const state = await getEmailById(itemId);
  Object.assign(state, newitem);
  return state.save();
};
const deleteEmail = async (itemId) => {
  const state = await NotificationEmails.findByIdAndDelete(itemId);
  if (!state) throw new ApiError(httpStatus.NOT_FOUND, "Record not Found");
  return true;
};
const getEmailById = async (itemId) => {
  const state = await NotificationEmails.findById(itemId);
  if (!state) throw new ApiError(httpStatus.NOT_FOUND, "Record not found!");
  return state;
};
module.exports = {
  addEmail,
  getEmail,
  getEmailById,
  deleteEmail,
  updateEmail,
};
