const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { NewsLetterServices } = require('../services');
const { searchQueryConverter } = require('../utils/searchQueryConverter');

const addNewsLetter = catchAsync(async (req, res) => {
    const newsletter = await NewsLetterServices.addNewsLetter(req.body);
    if (!newsletter) {
        throw new ApiError(500, 'Something went wrong');
    }
    res.status(httpStatus.OK).send(newsletter);
});
const getAllNewsLetters = catchAsync(async (req, res) => {
    let filter = pick(req.query, []);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const newsletters = await NewsLetterServices.getNewsLetters(
        filter,
        options
    );
    if (!newsletters) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong');
    }
    res.status(httpStatus.OK).send(newsletters);
});
const deleteNewsLetter = catchAsync(async (req, res) => {
    const newsletter = await NewsLetterServices.deleteNewsLetter(
        req.params.newsletterId
    );
    res.status(httpStatus.OK).send({
        message: 'NewsLetter deleted successfully!',
    });
});
const updateNewsLetter = catchAsync(async (req, res) => {
    const newsletter = await NewsLetterServices.updateNewsLetter(
        req.params.newsletterId,
        req.body
    );
    res.status(httpStatus.OK).send(newsletter);
});
const getNewsLetter = catchAsync(async (req, res) => {
    const newsletter = await NewsLetterServices.getNewsLetterById(
        req.params.newsletterId
    );
    res.status(httpStatus.OK).send(newsletter);
});
module.exports = {
    addNewsLetter,
    getAllNewsLetters,
    updateNewsLetter,
    deleteNewsLetter,
    getNewsLetter,
};
