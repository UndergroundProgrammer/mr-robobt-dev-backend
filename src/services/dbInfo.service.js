const httpStatus = require('http-status');
const { DbInfo } = require('../models');
const ApiError = require('../utils/ApiError');

const createDbInfo = async (data) => {
    let dbInfo = await DbInfo.create(data);
    if (!dbInfo) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
    }
    return dbInfo;
};

const updateDbinfo = async (id, updateData) => {
    const dbInfo = await DbInfo.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    if (!dbInfo) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
    }
    return dbInfo;
};
const getDbinfo = async () => {
    const dbInfo = await DbInfo.find();
    if (dbInfo.length == 0) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            'Something went wrong or you have not data'
        );
    }
    return dbInfo;
};

module.exports = {
    createDbInfo,
    updateDbinfo,
    getDbinfo,
};
