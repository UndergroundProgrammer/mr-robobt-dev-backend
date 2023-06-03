const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { pricingItemsServices } = require('../services');

const addItem = catchAsync(async (req, res) => {
    const item = await pricingItemsServices.addItem(req.body);
    if (!item) {
        throw new ApiError(500, 'Something went wrong');
    }
    res.send(item);
});
const getAllItems = catchAsync(async (req, res) => {
    const items = await pricingItemsServices.getItems(req.body);
    if (!items) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong');
    }
    res.send(items);
});
module.exports = {
    addItem,
    getAllItems,
};
