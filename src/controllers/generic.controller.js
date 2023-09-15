const catchAsync = require("../utils/catchAsync");
const { DbInfoService } = require("../services");
const { bytesToSize } = require("../utils/bytesToUnitSizes");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const { string } = require("joi");
const modalNames = [
  "Captcha Results",
  "Contact US",
  "NewsLetter Users",
  "Site Visitors",
  "Logs",
];
const getModelAndDeleteData = catchAsync(async (req, res) => {
  let { modelName, attributes } = pick(req.query, ["modelName", "attributes"]);
  const model = mongoose.model(modelName);
  if (model && !modalNames.includes(modelName)) {
    throw new ApiError(
      httpStatus.NOT_MODIFIED,
      "You are not allowed to delete this table data"
    );
  }
  attributes = attributes && JSON.parse(attributes);
  const filter = attributes ? attributes : {};
  const data = await model.deleteMany(filter);

  if (data.deletedCount == 0)
    throw new ApiError(httpStatus.NOT_FOUND, "No data found for table");
  res
    .status(httpStatus.OK)
    .send({ data, message: "Table data has been deleted successfuly!" });
});

module.exports = {
  getModelAndDeleteData,
};
