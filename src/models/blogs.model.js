const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const blogsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
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
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
blogsSchema.plugin(toJSON);
blogsSchema.plugin(paginate);

/**
 * @typedef User
 */
const Blog = mongoose.model('Blogs', blogsSchema);

module.exports = Blog;
