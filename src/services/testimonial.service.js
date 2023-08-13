const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Testimonial } = require('../models');
const addTestimonial = async (testimonialData) => {
    const testimonial = await Testimonial.create(testimonialData);
    if (!testimonial) {
        throw new ApiError(500, 'Something went wrong');
    }
    return testimonial;
};
const getTestimonials = async () => {
    const testimonials = await Testimonial.find();
    if (!testimonials) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No Testimonial Found!');
    }
    return testimonials;
};
const updateTestimonial = async (itemId, newitem) => {
    const testimonial = await getTestimonialById(itemId);
    Object.assign(testimonial, newitem);
    return testimonial.save();
};
const deleteTestimonial = async (itemId) => {
    const testimonial = await Testimonial.findByIdAndDelete(itemId);
    if (!testimonial)
        throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not Found');
    return true;
};
const getTestimonialById = async (itemId) => {
    const testimonial = await Testimonial.findById(itemId);
    if (!testimonial)
        throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found!');
    return testimonial;
};
module.exports = {
    addTestimonial,
    getTestimonials,
    getTestimonialById,
    deleteTestimonial,
    updateTestimonial,
};
