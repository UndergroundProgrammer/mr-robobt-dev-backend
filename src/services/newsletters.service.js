const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { NewsLetter } = require('../models');
const addNewsLetter = async (data) => {
    const newsletter = await NewsLetter.create(data);
    if (!newsletter) {
        throw new ApiError(500, 'Something went wrong');
    }
    return newsletter;
};
const getNewsLetters = async (filters, options) => {
    const newsletters = await NewsLetter.paginate(filters, options);
    if (!newsletters) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No NewsLetter Found!');
    }
    return newsletters;
};
const updateNewsLetter = async (newsletterId, newNewsLetter) => {
    const newsletter = await getNewsLetterById(newsletterId);
    Object.assign(newsletter, newNewsLetter);
    return newsletter.save();
};
const deleteNewsLetter = async (newsletterId) => {
    const newsletter = await NewsLetter.findByIdAndDelete(newsletterId);
    if (!newsletter)
        throw new ApiError(httpStatus.NOT_FOUND, 'NewsLetter not Found');
    return true;
};
const getNewsLetterById = async (newsletterId) => {
    const newsletter = await NewsLetter.findById(newsletterId);
    if (!newsletter)
        throw new ApiError(httpStatus.NOT_FOUND, 'NewsLetter not found!');
    return newsletter;
};
module.exports = {
    addNewsLetter,
    getNewsLetters,
    getNewsLetterById,
    deleteNewsLetter,
    updateNewsLetter,
};
