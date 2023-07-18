const httpStatus = require('http-status');
const { NewsLetterUser } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<NewsLetterUser>}
 */
const createNewsLetterUser = async (userBody) => {
    const alreadyUser = await getNewsLetterUserByEmail(userBody.email);
    if (alreadyUser) {
        return alreadyUser;
    }
    const user = await NewsLetterUser.create(userBody);
    return user;
};

const queryNewsLetterUsers = async (filter, options) => {
    const users = await NewsLetterUser.paginate(filter, options);
    return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<NewsLetterUser>}
 */
const getNewsLetterUserById = async (id) => {
    return NewsLetterUser.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<NewsLetterUser>}
 */
const getNewsLetterUserByEmail = async (email) => {
    return NewsLetterUser.findOne({ email });
};

const updateNewsLetterUserById = async (userId, updateBody) => {
    const user = await getNewsLetterUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'News Letter User not found');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteNewsLetterUserById = async (userId) => {
    const user = await getNewsLetterUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'News Letter User not found');
    }
    await user.remove();
    return user;
};
const unsubscribeNewsLetter = async (email, data) => {
    const user = await NewsLetterUser.findOneAndUpdate({ email }, data);
    if (!user) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            'No subcription found with this email'
        );
    }

    return user;
};

module.exports = {
    createNewsLetterUser,
    queryNewsLetterUsers,
    getNewsLetterUserById,
    getNewsLetterUserByEmail,
    updateNewsLetterUserById,
    deleteNewsLetterUserById,
    unsubscribeNewsLetter,
};
