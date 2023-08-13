const express = require('express');
const validate = require('../middlewares/validate');
const { testimonialValidation } = require('../validations');
const { TestimonialController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .post(
        validate(testimonialValidation.addTestmonial),
        TestimonialController.addTestimonial
    )
    .get(TestimonialController.getAllTestimonials);
router
    .route('/:testimonialId')
    .get(
        validate(testimonialValidation.TestimonialById),
        TestimonialController.getTestimonial
    )
    .put(
        validate(testimonialValidation.TestimonialById),
        TestimonialController.updateTestimonial
    )
    .delete(
        validate(testimonialValidation.TestimonialById),
        TestimonialController.deleteTestimonial
    );

module.exports = router;
