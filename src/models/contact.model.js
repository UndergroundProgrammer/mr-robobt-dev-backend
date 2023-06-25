const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const pricingItem = {
    _id: false,
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
};
const contactSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
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
        message: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
            trim: true,
            enum: ['App pricing', 'Contact us', 'Live chat'],
            default: 'Contact us',
        },
        subject: {
            type: String,
            trim: true,
        },
        appPricing: {
            service: [pricingItem],
            functionalities: [pricingItem],
            devices: [pricingItem],
            totalPrice: {
                type: Number,
            },
        },
    },
    {
        strictPopulate: false,
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
contactSchema.plugin(toJSON);
contactSchema.plugin(paginate);
contactSchema.pre('save', function (next) {
    const paths = Object.keys(contactSchema.paths);

    paths.forEach((path) => {
        if (!this.isModified(path)) {
            this[path] = undefined;
        }
    });

    next();
});
/**
 * @typedef User
 */
const Contact = mongoose.model('Contact US', contactSchema);

module.exports = Contact;
