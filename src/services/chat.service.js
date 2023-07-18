const httpStatus = require('http-status');
const { Chat, Message } = require('../models');
const ApiError = require('../utils/ApiError');

const createChat = async (data) => {
    const { senderId, receiverId } = data;
    if (senderId === receiverId)
        throw new ApiError(
            httpStatus.NOT_ACCEPTABLE,
            'you couldnot message to yourself'
        );
    let findChat = await Chat.findOne({ senderId, receiverId }).populate(
        'senderId receiverId',
        'firstName lastName photoUrl email'
    );
    if (findChat) {
        return updateChat(findChat.id, { isClosed: false, isDeleted: false });
    }
    const chat = await Chat.create({ senderId, receiverId });
    chat.populate('senderId receiverId', 'firstName lastName photoUrl email');
    return chat.save();
};
const findUserChats = async (userId) => {
    const chat = await Chat.find({
        isDeleted: false,
        $or: [{ senderId: userId }, { receiverId: userId }],
    }).populate('senderId receiverId', 'firstName lastName photoUrl email');

    if (!chat)
        throw new ApiError(
            httpStatus.NOT_FOUND,
            'No Chats found for this user'
        );

    return chat;
};
const findUserChatById = async (firstId, secondId) => {
    const chat = await Chat.findOne({
        members: { $all: [firstId, secondId] },
    });
    if (!chat) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No Chat found for this user');
    }
    return chat;
};

const createMessage = async (chatId, messageBody) => {
    const message = await Message.findOneAndUpdate(
        { chatId },
        { $push: { chatHistory: messageBody } },
        { useFindAndModify: false }
    ).exec();
    if (!message) {
        await Message.create({ chatId, chatHistory: [messageBody] });
        return messageBody;
    }
    return messageBody;
};

const getMessages = async (chatId) => {
    const chat = await Message.findOne({ chatId });
    if (!chat) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No messages found!!!');
    }

    return chat.chatHistory;
};
const updateUnreadCount = async (chatId, count) => {
    const chat = await Chat.findByIdAndUpdate(
        chatId,
        { $inc: { [`${count}Count`]: 1 } },
        { upsert: true }
    );
    if (!chat) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No conversation found!');
    }

    return chat;
};

const setUnreadCount = async (chatId, count) => {
    const chat = await Chat.findByIdAndUpdate(
        chatId,
        { $set: { [`${count}Count`]: 0 } },
        { upsert: true }
    );
    if (!chat) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No conversation found!');
    }

    return chat;
};
const deleteChat = async (chatId) => {
    const chat = await Chat.findByIdAndUpdate(
        chatId,
        { isDeleted: true },
        {
            upsert: true,
        }
    );
    if (!chat) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No conversation found!');
    }

    return chat;
};
const updateChat = async (chatId, updateChat) => {
    const chat = await Chat.findByIdAndUpdate(chatId, updateChat, {
        new: true,
    }).populate('senderId receiverId', 'firstName lastName photoUrl email');
    if (!chat) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No conversation found!');
    }
    console.log(updateChat, chat);
    return chat;
};

module.exports = {
    createChat,
    findUserChats,
    findUserChatById,
    createMessage,
    getMessages,
    updateUnreadCount,
    setUnreadCount,
    deleteChat,
    updateChat,
};
