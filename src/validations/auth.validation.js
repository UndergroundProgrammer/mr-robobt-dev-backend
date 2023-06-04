const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const sendInvite = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        group: Joi.string().required(),
    }),
};
const register = {
    body: Joi.object({
        firstName: Joi.string(),
        surName: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().custom(password),
        phoneNo: Joi.string(),
        photoUrl: Joi.string(),
        role: Joi.string().valid('staff','admin','client'),
    }),
};

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const logout = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId).required(),
    }),
};

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
};

const resetPassword = {
    body: Joi.object().keys({
        password: Joi.string().required().custom(password),
        token: Joi.string().required(),
    }),
};

const verifyEmail = {
    query: Joi.object().keys({
        token: Joi.string().required(),
        group:Joi.string()
    }),
};
const changePassword = {
    body: Joi.object().keys({
        userId: Joi.custom(objectId),
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
    }),
};

module.exports = {
    sendInvite,
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    verifyEmail,
    changePassword,
};
