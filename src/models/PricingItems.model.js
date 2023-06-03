const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const pricingItemsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
        },
        description: {
            type: String,
            trim: true,
        },
        logo: {
            type: String,
            trim: true,
            default: '/img/placeholderLogo.png',
        },
        type: {
            type: String,
            enum: ['Functionality', 'Device', 'Service'],
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
pricingItemsSchema.plugin(toJSON);
pricingItemsSchema.plugin(paginate);

/**
 * @typedef User
 */
const PricingItem = mongoose.model('Pricing Items', pricingItemsSchema);

module.exports = PricingItem;
