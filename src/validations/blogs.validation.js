const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('./custom.validation');

const addBlog = {
    body: Joi.object({
        name: Joi.string().trim(),
        description: Joi.string().trim(),
        logo: Joi.string().trim(),
    }),
};
const updateBlog = {
    params: Joi.object({
        blogId: Joi.string().custom(objectId),
    }),
    body: Joi.object({
        name: Joi.string().trim(),
        description: Joi.string().trim(),
        logo: Joi.string().trim(),
    }),
};
const BlogById = {
    params: Joi.object({
        blogId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    addBlog,
    updateBlog,
    BlogById,
};
