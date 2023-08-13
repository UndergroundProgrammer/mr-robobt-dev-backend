const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const newsLetterSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        logo: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
newsLetterSchema.plugin(toJSON);
newsLetterSchema.plugin(paginate);

/**
 * @typedef User
 */
const NewsLetter = mongoose.model('NewsLetters', newsLetterSchema);

module.exports = NewsLetter;
