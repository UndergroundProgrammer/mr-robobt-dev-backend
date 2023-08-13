const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { TestimonialService } = require('../services');

const addTestimonial = catchAsync(async (req, res) => {
    const testimonial = await TestimonialService.addTestimonial(req.body);
    if (!testimonial) {
        throw new ApiError(500, 'Something went wrong');
    }
    res.status(httpStatus.OK).send(testimonial);
});
const getAllTestimonials = catchAsync(async (req, res) => {
    const testimonials = await TestimonialService.getTestimonials(req.body);
    if (!testimonials) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong');
    }
    res.status(httpStatus.OK).send(testimonials);
});
const deleteTestimonial = catchAsync(async (req, res) => {
    const testimonial = await TestimonialService.deleteTestimonial(
        req.params.testimonialId
    );
    res.status(httpStatus.OK).send({
        message: 'Testimonial deleted successfully!',
    });
});
const updateTestimonial = catchAsync(async (req, res) => {
    const testimonial = await TestimonialService.updateTestimonial(
        req.params.testimonialId,
        req.body
    );
    res.status(httpStatus.OK).send(testimonial);
});
const getTestimonial = catchAsync(async (req, res) => {
    const testimonial = await TestimonialService.updateTestimonial(
        req.params.testimonialId
    );
    res.status(httpStatus.OK).send(testimonial);
});
module.exports = {
    addTestimonial,
    getAllTestimonials,
    updateTestimonial,
    deleteTestimonial,
    getTestimonial,
};
