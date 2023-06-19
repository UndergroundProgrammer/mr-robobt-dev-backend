const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const {
    userValidation,
    chatUserValidation,
    newsLetterUserValidation,
} = require('../validations');
const {
    userController,
    chatUserController,
    newsLetterUsersController,
} = require('../controllers');

const router = express.Router();
router.route('/send-chatlink').post(userController.sendUserChatLink);
router
    .route('/newsletterusers')
    .post(
        validate(newsLetterUserValidation.createUser),
        newsLetterUsersController.createUser
    )
    .get(newsLetterUsersController.getUsers);
router
    .route('/newsletterusers/:userId')
    .delete(
        validate(newsLetterUserValidation.deleteUser),
        newsLetterUsersController.deleteUser
    )
    .put(
        validate(newsLetterUserValidation.updateUser),
        newsLetterUsersController.updateUser
    )
    .get(
        validate(newsLetterUserValidation.getUser),
        newsLetterUsersController.getUser
    );
router
    .route('/chatusers')
    .post(
        validate(chatUserValidation.createUser),
        chatUserController.createUser
    );
router.route('/').get(userController.getUsers);
router
    .route('/:userId')
    .get(validate(userValidation.getUser), userController.getUser)
    .delete(validate(userValidation.deleteUser), userController.deleteUser)
    .put(validate(userValidation.updateUser), userController.updateUser);

module.exports = router;
