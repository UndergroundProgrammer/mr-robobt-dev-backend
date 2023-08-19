const Joi = require("joi").extend(require("@joi/date"));
const { objectId } = require("./custom.validation");

const addState = {
  body: Joi.object({
    countries: Joi.number(),
    totalEmployes: Joi.number(),
    monthlyTraffic: Joi.string().trim(),
    brands: Joi.number(),
  }),
};
const updateState = {
  params: Joi.object({
    stateId: Joi.string().custom(objectId),
  }),
  body: Joi.object({
    countries: Joi.number(),
    totalEmployes: Joi.number(),
    monthlyTraffic: Joi.string().trim(),
    brands: Joi.number(),
  }),
};
const StateById = {
  params: Joi.object({
    stateId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addState,
  updateState,
  StateById,
};
