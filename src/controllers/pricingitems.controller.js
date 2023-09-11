const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { pricingItemsServices } = require("../services");

const addItem = catchAsync(async (req, res) => {
  const item = await pricingItemsServices.addItem(req.body);
  if (!item) {
    throw new ApiError(500, "Something went wrong");
  }
  res.status(httpStatus.OK).send(item);
});
const getAllItems = catchAsync(async (req, res) => {
  const items = await pricingItemsServices.getItems(req.body);
  if (!items) {
    throw new ApiError(httpStatus.NOT_FOUND, "Something went wrong");
  }
  res.status(httpStatus.OK).send(items);
});
const deleteItem = catchAsync(async (req, res) => {
  const item = await pricingItemsServices.deleteItem(req.params.itemId);
  res.status(httpStatus.OK).send({ message: "Item deleted successfully!" });
});
const updateItem = catchAsync(async (req, res) => {
  const item = await pricingItemsServices.updateItem(
    req.params.itemId,
    req.body
  );
  res.status(httpStatus.OK).send(item);
});
const getItem = catchAsync(async (req, res) => {
  const item = await pricingItemsServices.getItemById(req.params.itemId);
  res.status(httpStatus.OK).send(item);
});
module.exports = {
  addItem,
  getAllItems,
  updateItem,
  deleteItem,
  getItem,
};
