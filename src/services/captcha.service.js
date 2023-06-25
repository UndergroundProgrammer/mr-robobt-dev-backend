const httpStatus = require('http-status');
const { NewsLetterUser } = require('../models');
const { Captcha } = require('../models');
const ApiError = require('../utils/ApiError');

const createCaptcha = async (captchaData) => {
    const captcha = await Captcha.create(captchaData);
    return captcha;
};
const getCaptcha = async (filters, options) => {
    const visitors = await Captcha.paginate(filters, options);
    if (!visitors) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No Captchas Found');
    }
    return visitors;
};

module.exports = {
    createCaptcha,
    getCaptcha,
};
