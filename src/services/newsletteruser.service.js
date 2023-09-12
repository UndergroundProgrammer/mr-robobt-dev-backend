const httpStatus = require("http-status");
const { NewsLetterUser } = require("../models");
const ApiError = require("../utils/ApiError");
const { emailService } = require("../services");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<NewsLetterUser>}
 */
const createNewsLetterUser = async (userBody) => {
  const alreadyUser = await getNewsLetterUserByEmail(userBody.email);
  if (alreadyUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "Something went wrong");
  }
  const user = await NewsLetterUser.create(userBody);
  await emailService.sendNewsLetterSubscribedEmail(userBody.email);
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
    throw new ApiError(httpStatus.NOT_FOUND, "News Letter User not found");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteNewsLetterUserById = async (userId) => {
  const user = await getNewsLetterUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "News Letter User not found");
  }
  await user.remove();
  return user;
};
const unsubscribeNewsLetter = async (email, data) => {
  const user = await NewsLetterUser.findOneAndUpdate({ email }, data);
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No subcription found with this email"
    );
  }

  return user;
};
const getNewsLetterUsersWithoutPagination = async () => {
  try {
    const subscribedUsers = await NewsLetterUser.find({ status: "subscribed" });
    if (subscribedUsers.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, "No subscribed users found!");
    }
    return subscribedUsers;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "An error occurred while fetching subscribed users"
    );
  }
};
module.exports = {
  createNewsLetterUser,
  queryNewsLetterUsers,
  getNewsLetterUserById,
  getNewsLetterUserByEmail,
  updateNewsLetterUserById,
  deleteNewsLetterUserById,
  unsubscribeNewsLetter,
  getNewsLetterUsersWithoutPagination,
};
