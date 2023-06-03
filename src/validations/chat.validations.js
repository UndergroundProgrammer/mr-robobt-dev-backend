const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createChat = {
  body: Joi.object().keys({
    senderId: Joi.custom(objectId),
    receiverId: Joi.custom(objectId),
  }),
};

const createMessage = {
  body: Joi.object().keys({
    chatId: Joi.custom(objectId),
    messageBody: Joi.object(),
  }),
};

const findChatByIds = {
  body: Joi.object().keys({
    chatId: Joi.custom(objectId),
    userId: Joi.custom(objectId),
  }),
};

const getMessages = {
  params: Joi.object().keys({
    chatId: Joi.custom(objectId),
  }),
};

const findChats = {
  params: Joi.object().keys({
    userId: Joi.custom(objectId),
  }),
};
module.exports = {
  createChat,
  createMessage,
  findChatByIds,
  getMessages,
  findChats,
};
