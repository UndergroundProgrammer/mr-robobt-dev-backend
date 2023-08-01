const catchAsync = require('../utils/catchAsync');
const { DbInfoService } = require('../services');
const { bytesToSize } = require('../utils/bytesToUnitSizes');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const createDbInfo = catchAsync(async (req, res) => {
    const dbInfo = await DbInfoService.createDbInfo(req.body);
    res.status(200).send(dbInfo);
});

const updateDbinfo = catchAsync(async (req, res) => {
    const dbInfo = await DbInfoService.updateDbinfo(
        req.params.dbInfoId,
        req.body
    );
    res.status(200).send(dbInfo);
});
const getStorage = catchAsync(async (req, res) => {
    const db = mongoose.connection.db;
    const stats = await db.stats();
    const dbinfo = await DbInfoService.getDbinfo();

    res.status(httpStatus.OK).send({
        totalSize: dbinfo[0].storageSize,
        storageUnit: dbinfo[0].storageUnit,
        usedStorage: bytesToSize(stats.storageSize, dbinfo[0].storageUnit),
    });
});

module.exports = {
    createDbInfo,
    updateDbinfo,
    getStorage,
};
