const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { newsletterUserServices } = require('../services');

const createUser = catchAsync(async (req, res) => {
    const user = await newsletterUserServices.createNewsLetterUser(req.body);
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
    const filter = pick(req.query, ['']);
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

module.exports = {
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,
};
