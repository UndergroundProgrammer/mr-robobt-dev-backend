const httpStatus = require("http-status");
const { NewsLetterUser } = require("../models");
const Visitor = require("../models/visitors.model");
const ApiError = require("../utils/ApiError");

const createVisitor = async (visitorData) => {
  const alreadyUser = await Visitor.findOneAndDelete({
    ipAddress: visitorData.ipAddress,
  });

  const user = await Visitor.create(visitorData);
  return user;
};
const getVisitor = async (filters, options) => {
  const visitors = await Visitor.paginate(filters, options);
  if (!visitors) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Visitors Found");
  }
  return visitors;
};

const updateVisitorById = async (userId, updateBody) => {
  const user = await Visitor.findByIdAndUpdate(userId, updateBody, {
    upsert: true,
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

module.exports = {
  createVisitor,
  getVisitor,
  updateVisitorById,
};
