const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const TestimonialSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        profession: {
            type: String,
            trim: true,
        },
        companyName: {
            type: String,
            trim: true,
        },
        rating: {
            type: Number,
            trim: true,
        },
        review: {
            type: String,
            trim: true,
        },
        logo: {
            type: String,
            trim: true,
            default: '/img/placeholderLogo.png',
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
TestimonialSchema.plugin(toJSON);
TestimonialSchema.plugin(paginate);

/**
 * @typedef User
 */
const Testimonial = mongoose.model('Testimonials', TestimonialSchema);
module.exports = Testimonial;
