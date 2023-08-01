const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { newsletterUserServices, emailService } = require('../services');
const { searchQueryConverter } = require('../utils/searchQueryConverter');

const createUser = catchAsync(async (req, res) => {
    const user = await newsletterUserServices.createNewsLetterUser(req.body);
    await emailService.sendNewsLetterSubscribedEmail(req.body.email);
    res.send(user);
});
const updateUser = catchAsync(async (req, res) => {
    const user = await newsletterUserServices.updateNewsLetterUserById(
        req.params.userId,
        req.body
    );
    res.send(user);
});

const getUsers = catchAsync(async (req, res) => {
    let filter = pick(req.query, ['status', 'search']);
    if (filter.search) {
        let searchQuery = searchQueryConverter(filter.search);
        filter = {
            ...filter,
            ...searchQuery,
        };
        delete filter['search'];
    }
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await newsletterUserServices.queryNewsLetterUsers(
        filter,
        options
    );
    res.send(result);
});

const getUser = catchAsync(async (req, res) => {
    const user = await newsletterUserServices.getNewsLetterUserById(
        req.params.userId
    );
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
    await newsletterUserServices.deleteNewsLetterUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});
const unsubNewsLetter = catchAsync(async (req, res) => {
    await newsletterUserServices.unsubscribeNewsLetter(req.body.email, {
        ...req.body,
        email: undefined,
    });
    res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,
    unsubNewsLetter,
};
