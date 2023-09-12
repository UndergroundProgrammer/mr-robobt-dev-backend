const express = require("express");
const validate = require("../middlewares/validate");
const { notificationEmailsValidation } = require("../validations");
const { NotificationEmailsController } = require("../controllers");

const router = express.Router();

router
  .route("/")
  .post(
    validate(notificationEmailsValidation.addEmail),
    NotificationEmailsController.addEmail
  )
  .get(NotificationEmailsController.getAllEmails);
router
  .route("/:emailId")
  .get(
    validate(notificationEmailsValidation.EmailById),
    NotificationEmailsController.getEmail
  )
  .put(
    validate(notificationEmailsValidation.EmailById),
    NotificationEmailsController.updateEmail
  )
  .delete(
    validate(notificationEmailsValidation.EmailById),
    NotificationEmailsController.deleteEmail
  );

module.exports = router;
