const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const ChatSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    senderCount: {
      type: Number,
      default: 0,
    },
    receiverCount: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ChatSchema.plugin(toJSON);

const Chat = mongoose.model('Chats', ChatSchema);

module.exports = Chat;
