const Joi = require("joi").extend(require("@joi/date"));
const { objectId } = require("./custom.validation");

const addLog = {
  body: Joi.object({
    name: Joi.string().trim(),
    email: Joi.string().trim(),
    group: Joi.string().trim(),
    log: Joi.string().trim(),
  }),
};
const updateLog = {
  params: Joi.object({
    logId: Joi.string().custom(objectId),
  }),
  body: Joi.object({
    name: Joi.string().trim(),
    email: Joi.string().trim(),
    group: Joi.string().trim(),
    log: Joi.string().trim(),
  }),
};
const LogById = {
  params: Joi.object({
    logId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addLog,
  updateLog,
  LogById,
};
