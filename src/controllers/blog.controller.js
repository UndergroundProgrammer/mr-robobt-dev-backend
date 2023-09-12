const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { blogServices } = require("../services");

const addBlog = catchAsync(async (req, res) => {
  const blog = await blogServices.addBlog(req.body);
  if (!blog) {
    throw new ApiError(500, "Something went wrong");
  }
  res.status(httpStatus.OK).send(blog);
});
const getAllBlogs = catchAsync(async (req, res) => {
  const blogs = await blogServices.getBlogs(req.body);
  if (!blogs) {
    throw new ApiError(httpStatus.NOT_FOUND, "Something went wrong");
  }
  res.status(httpStatus.OK).send(blogs);
});
const deleteBlog = catchAsync(async (req, res) => {
  const blog = await blogServices.deleteBlog(req.params.blogId);
  res.status(httpStatus.OK).send({ message: "Blog deleted successfully!" });
});
const updateBlog = catchAsync(async (req, res) => {
  const blog = await blogServices.updateBlog(req.params.blogId, req.body);
  res.status(httpStatus.OK).send(blog);
});
const getBlog = catchAsync(async (req, res) => {
  const blog = await blogServices.getBogById(req.params.blogId);
  res.status(httpStatus.OK).send(blog);
});
module.exports = {
  addBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlog,
};
