const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const captchaSchema = mongoose.Schema(
    {
        ipAddress: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
        userClassification: {
            type: String,
            trim: true,
        },
        result: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
captchaSchema.plugin(toJSON);
captchaSchema.plugin(paginate);

const Captcha = mongoose.model('Captcha Results', captchaSchema);
module.exports = Captcha;
