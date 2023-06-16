const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const newsLetterUsersSchema = mongoose.Schema(
    {
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
        status: {
            type: String,
            trim: true,
            enum: ['subscribed', 'unsubscribed'],
            default: 'subscribed',
        },
        reason: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
newsLetterUsersSchema.plugin(toJSON);
newsLetterUsersSchema.plugin(paginate);

const NewsLetterUser = mongoose.model(
    'NewsLetter Users',
    newsLetterUsersSchema
);
module.exports = NewsLetterUser;
