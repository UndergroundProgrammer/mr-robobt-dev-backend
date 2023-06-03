const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { chatController } = require("../controllers");
const { chatValidations } = require("../validations");

const router = express.Router();
router.post(
  "/createMessage",
  auth(),
  validate(chatValidations.createMessage),
  chatController.createMessage
);
router.get(
  "/:userId",
  auth(),
  validate(chatValidations.findChats),
  chatController.userChats
);
router.post(
  "/findChat",
  auth(),
  validate(chatValidations.findChatByIds),
  chatController.findChatByIds
);
router.get(
  "/getMessages/:chatId",
  auth(),
  validate(chatValidations.getMessages),
  chatController.getMessages
);
router.post(
  "/",
  auth(),
  validate(chatValidations.createChat),
  chatController.createChat
);
router.route("/setUnreadCount").put(auth(), chatController.setUnreadCount);
module.exports = router;
