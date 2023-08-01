const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const DbInfoSchema = new mongoose.Schema({
    storageSize: {
        type: Number,
    },
    storageUnit: {
        type: String,
    },
});
// add plugin that converts mongoose to json
DbInfoSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const DbInfo = mongoose.model('DbStorage Info', DbInfoSchema);

module.exports = DbInfo;
