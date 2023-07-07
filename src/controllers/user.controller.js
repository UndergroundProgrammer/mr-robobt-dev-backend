const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {
    projectService,
    userService,
    contactServices,
    emailService,
    chatService,
    tokenService,
} = require('../services');

const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.send(user);
});

const getUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['isActive', 'role', 'isApproved']);
    filter.role = filter.role || { $ne: 'admin' };
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    Object.assign(options, { populate: 'group-groupName' });
    const result = await userService.queryUsers(filter, options);
    console.log(result);
    res.send(result);
});

const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});
const sendUserChatLink = catchAsync(async (req, res) => {
    const { chat, email, name } = req.body;
    console.log(email, name);
    const token = await tokenService.generateChatLinkToken(chat);
    await emailService.sendChatLinkEmail(
        email ? email : chat.senderId.email,
        name ? name : chat.senderId.firstName,
        token
    );
    await res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
    updateUser,
    getUsers,
    getUser,
    deleteUser,
    sendUserChatLink,
};
