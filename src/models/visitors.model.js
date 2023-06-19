const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const visitorsSchema = mongoose.Schema(
    {
        ipAddress: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
visitorsSchema.plugin(toJSON);
visitorsSchema.plugin(paginate);

const Visitor = mongoose.model('Site Visitors', visitorsSchema);
module.exports = Visitor;
