const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

const router = express.Router();
router.route("/").get(userController.getUsers)
router
    .route('/:userId')
    .get( validate(userValidation.getUser), userController.getUser)
    .delete(
        validate(userValidation.deleteUser),
        userController.deleteUser
    ).put( 
    validate(userValidation.updateUser),
    userController.updateUser);

module.exports = router;
