const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const mongoose = require('mongoose');
const getStorage = catchAsync(async (req, res) => {
    const db = mongoose.connection.db;
    const stats = await db.stats();
    res.status(httpStatus.OK).send({
        totalSize: config.totalDBSIze,
        usedStorage: stats.storageSize / (1024 * 1024 * 1024),
    });
});

module.exports = {
    getStorage,
};
