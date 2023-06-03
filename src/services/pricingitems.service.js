const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const PricingItem = require('../models/PricingItems.model');

const addItem = async (itemData) => {
    const item = await PricingItem.create(itemData);
    if (!item) {
        throw new ApiError(500, 'Something went wrong');
    }
    return item;
};
const getItems = async () => {
    const item = await PricingItem.find();
    return item;
};
module.exports = {
    addItem,
    getItems,
};
