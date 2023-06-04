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
    const items = await PricingItem.aggregate([
        {
            $group: {
                _id: '$type',
                objects: { $push: '$$ROOT' },
            },
        },
    ]);
    const groupedItems = items.reduce((acc, { _id, objects }) => {
        acc[_id] = objects;
        return acc;
    }, {});
    return groupedItems;
};
const updateItem = async (itemId, updateItem) => {
    const item = await getItemById(itemId);
    Object.assign(item, updateItem);
    return item.save();
};
const deleteItem = async (itemId) => {
    const item = await PricingItem.findByIdAndDelete(itemId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not Found');
    return true;
};
const getItemById = async (itemId) => {
    const item = await PricingItem.findById(itemId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found!');
    return item;
};
module.exports = {
    addItem,
    getItems,
    getItemById,
    deleteItem,
    updateItem,
};
