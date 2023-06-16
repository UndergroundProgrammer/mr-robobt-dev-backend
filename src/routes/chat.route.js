const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { chatController } = require('../controllers');
const { chatValidations } = require('../validations');

const router = express.Router();
router.post(
    '/createMessage',
    validate(chatValidations.createMessage),
    chatController.createMessage
);

router
    .route('/:userId')
    .get(auth(), validate(chatValidations.findChats), chatController.userChats);
router.post(
    '/findChat',
    auth(),
    validate(chatValidations.findChatByIds),
    chatController.findChatByIds
);
router.get(
    '/getMessages/:chatId',
    validate(chatValidations.getMessages),
    chatController.getMessages
);
router
    .route('/:chatId')
    .delete(chatController.deleteChat)
    .put(chatController.updateChat);
router.post(
    '/',
    validate(chatValidations.createChat),
    chatController.createChat
);
router.route('/setUnreadCount').put(auth(), chatController.setUnreadCount);
module.exports = router;
