const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('./custom.validation');

const contactUs = {
    body: Joi.object({
        fullName: Joi.string().trim(),
        email: Joi.string().trim().email(),
        phoneNo: Joi.string().trim(),
        message: Joi.string().trim(),
        subject: Joi.string().trim(),
        type: Joi.string()
            .valid('App pricing', 'Contact us', 'Live chat')
            .trim(),
        appPricing: Joi.object({
            service: Joi.array().items(Joi.object()),
            functionalities: Joi.array().items(Joi.object()),
            devices: Joi.array().items(Joi.object()),
            totalPrice: Joi.number(),
        }),
    }),
};

module.exports = {
    contactUs,
};
