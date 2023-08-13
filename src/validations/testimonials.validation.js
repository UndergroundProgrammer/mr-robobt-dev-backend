const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('./custom.validation');

const addTestmonial = {
    body: Joi.object({
        name: Joi.string().trim(),
        profession: Joi.string().trim(),
        companyName: Joi.string().trim(),
        review: Joi.string().trim(),
        rating: Joi.number(),
        logo: Joi.string().trim(),
    }),
};
const updateTestimonial = {
    params: Joi.object({
        testimonialId: Joi.string().custom(objectId),
    }),
    body: Joi.object({
        name: Joi.string().trim(),
        profession: Joi.string().trim(),
        companyName: Joi.string().trim(),
        review: Joi.string().trim(),
        rating: Joi.number(),
        logo: Joi.string().trim(),
    }),
};
const TestimonialById = {
    params: Joi.object({
        testimonialId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    addTestmonial,
    updateTestimonial,
    TestimonialById,
};
