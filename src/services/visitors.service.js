const httpStatus = require('http-status');
const { NewsLetterUser } = require('../models');
const Visitor = require('../models/visitors.model');

const createVisitor = async (visitorData) => {
    const alreadyUser = await Visitor.findOne({
        ipAddress: visitorData.ipAddress,
    });
    if (alreadyUser) {
        return alreadyUser;
    }
    const user = await Visitor.create(userBody);
    return user;
};

module.exports = {
    createVisitor,
};
