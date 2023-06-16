const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const MessageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    chatHistory: [
        {
            author: {
                type: mongoose.SchemaTypes.ObjectId,
            },
            message: {
                type: String,
            },
            attachment: {
                type: String,
            },
            time: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});
// add plugin that converts mongoose to json
MessageSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Message = mongoose.model('Messages', MessageSchema);

module.exports = Message;
