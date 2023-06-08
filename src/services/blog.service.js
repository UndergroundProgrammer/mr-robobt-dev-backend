const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Blog } = require('../models');
const addBlog = async (itemData) => {
    const item = await Blog.create(itemData);
    if (!item) {
        throw new ApiError(500, 'Something went wrong');
    }
    return item;
};
const getBlogs = async () => {
    const blogs = await Blog.find();
    if (!blogs) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No Blog Found!');
    }
    return blogs;
};
const updateBlog = async (blogId, newblog) => {
    const item = await getBogById(blogId);
    Object.assign(item, newblog);
    return item.save();
};
const deleteBlog = async (blogId) => {
    const item = await Blog.findByIdAndDelete(blogId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Blog not Found');
    return true;
};
const getBogById = async (blogId) => {
    const item = await Blog.findById(blogId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!');
    return item;
};
module.exports = {
    addBlog,
    getBlogs,
    getBogById,
    deleteBlog,
    updateBlog,
};
