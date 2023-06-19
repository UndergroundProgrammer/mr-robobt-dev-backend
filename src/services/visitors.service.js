const httpStatus = require('http-status');
const { NewsLetterUser } = require('../models');
const Visitor = require('../models/visitors.model');
const ApiError = require('../utils/ApiError');

const createVisitor = async (visitorData) => {
    const alreadyUser = await Visitor.findOne({
        ipAddress: visitorData.ipAddress,
    });
    if (alreadyUser) {
        return alreadyUser;
    }
    const user = await Visitor.create(visitorData);
    return user;
};
const getVisitor = async (filters, options) => {
    const visitors = await Visitor.paginate(filters, options);
    if (!visitors) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No Visitors Found');
    }
    return visitors;
};

module.exports = {
    createVisitor,
    getVisitor,
};
