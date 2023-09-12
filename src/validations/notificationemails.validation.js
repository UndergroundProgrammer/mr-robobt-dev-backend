const Joi = require("joi").extend(require("@joi/date"));
const { objectId } = require("./custom.validation");

const addEmail = {
  body: Joi.object({
    email: Joi.string().trim(),
  }),
};
const updateEmail = {
  params: Joi.object({
    emailId: Joi.string().custom(objectId),
  }),
  body: Joi.object({
    email: Joi.string().trim(),
  }),
};
const EmailById = {
  params: Joi.object({
    emailId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addEmail,
  updateEmail,
  EmailById,
};
