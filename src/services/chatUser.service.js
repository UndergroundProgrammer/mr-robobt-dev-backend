const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { ChatUser } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<ChatUser>}
 */
const createChatUser = async (userBody) => {
    const alreadyUser = await getChatUserByEmail(userBody.email);
    if (alreadyUser) {
        return alreadyUser;
    }
    const user = await ChatUser.create(userBody);
    return user;
};

const queryChatUsers = async (filter, options) => {
    const users = await ChatUser.paginate(filter, options);
    return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<ChatUser>}
 */
const getChatUserById = async (id) => {
    return ChatUser.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<ChatUser>}
 */
const getChatUserByEmail = async (email) => {
    return ChatUser.findOne({ email });
};

const updateChatUserById = async (userId, updateBody) => {
    const user = await getChatUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'ChatUser not found');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteChatUserById = async (userId) => {
    const user = await getChatUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'ChatUser not found');
    }
    await user.remove();
    return user;
};

module.exports = {
    createChatUser,
    queryChatUsers,
    getChatUserById,
    getChatUserByEmail,
    updateChatUserById,
    deleteChatUserById,
};
