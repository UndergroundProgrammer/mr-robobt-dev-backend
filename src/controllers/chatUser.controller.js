const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatuserServices } = require('../services');

const createUser = catchAsync(async (req, res) => {
    const user = await chatuserServices.createChatUser(req.body);
    res.send(user);
});
const updateUser = catchAsync(async (req, res) => {
    const user = await chatuserServices.updateChatUserById(
        req.params.userId,
        req.body
    );
    res.send(user);
});

const getUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await chatuserServices.queryChatUsers(filter, options);
    res.send(result);
});

const getUser = catchAsync(async (req, res) => {
    const user = await chatuserServices.getChatUserById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
    await chatuserServices.deleteChatUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,
};
