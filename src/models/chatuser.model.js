const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const chatuserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
        },
        surName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        phoneNo: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
chatuserSchema.plugin(toJSON);
chatuserSchema.plugin(paginate);
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

const ChatUser = mongoose.model('Chat Users', chatuserSchema);

module.exports = ChatUser;
