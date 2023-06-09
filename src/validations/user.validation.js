const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('./custom.validation');

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        firstName: Joi.string(),
        surName: Joi.string(),
        bio: Joi.string(),
        photoUrl: Joi.string(),
        phoneNo: Joi.string(),
        isActive: Joi.bool(),
        role: Joi.string(),
        group: Joi.string(),
        country: Joi.string(),
        signedUpBy: Joi.string(),
        isApproved: Joi.bool(),
    }),
};
const chatLink = {
    body: Joi.object().keys({
        chat: Joi.object,
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
    chatLink,
};
