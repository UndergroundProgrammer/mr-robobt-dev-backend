const catchAsync = require('../utils/catchAsync');
const { chatService } = require('../services');

const createChat = catchAsync(async (req, res) => {
  const chat = await chatService.createChat(req.body);
  res.status(200).send(chat);
});

const userChats = catchAsync(async (req, res) => {
  const chat = await chatService.findUserChats(req.params.userId);
  res.status(200).send(chat);
});

const findChatByIds = catchAsync(async (req, res) => {
  const { firstId, secondId } = req.body;
  const chat = await chatService.findUserChatById(firstId, secondId);
  res.status(200).send(chat);
});

const createMessage = catchAsync(async (req, res) => {
  const { chatId, messageBody } = req.body;
  const message = await chatService.createMessage(chatId, messageBody);
  res.status(200).send(message);
});

const getMessages = catchAsync(async (req, res) => {
  const messages = await chatService.getMessages(req.params.chatId);
  res.status(200).send(messages);
});
const setUnreadCount = catchAsync(async (req, res) => {
  const conversation = await chatService.setUnreadCount(
    req.body.chatId,
    req.body.count
  );
  res.status(200).send(conversation);
});
module.exports = {
  createChat,
  userChats,
  findChatByIds,
  createMessage,
  getMessages,
  setUnreadCount,
};
