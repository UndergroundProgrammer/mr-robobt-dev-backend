const express = require('express');
const validate = require('../middlewares/validate');
const { blogsValidation } = require('../validations');
const { blogController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .post(validate(blogsValidation.addBlog), blogController.addBlog)
    .get(blogController.getAllBlogs);
router
    .route('/:blogId')
    .get(validate(blogsValidation.BlogById), blogController.getBlog)
    .put(validate(blogsValidation.BlogById), blogController.updateBlog)
    .delete(validate(blogsValidation.BlogById), blogController.deleteBlog);

module.exports = router;
