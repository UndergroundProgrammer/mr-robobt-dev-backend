const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('./custom.validation');

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        reason: Joi.string(),
        status: Joi.string(),
    }),
};

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().email(),
    }),
};
const getUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};
const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    updateUser,
    getUser,
    deleteUser,
    createUser,
};
