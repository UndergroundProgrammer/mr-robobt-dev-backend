const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('./custom.validation');

const addNewsletter = {
    body: Joi.object({
        name: Joi.string().trim(),
        description: Joi.string().trim(),
        logo: Joi.string().trim(),
    }),
};
const updateNewsletter = {
    params: Joi.object({
        newsletterId: Joi.string().custom(objectId),
    }),
    body: Joi.object({
        name: Joi.string().trim(),
        description: Joi.string().trim(),
        logo: Joi.string().trim(),
    }),
};
const NewsletterById = {
    params: Joi.object({
        newsletterId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    addNewsletter,
    updateNewsletter,
    NewsletterById,
};
