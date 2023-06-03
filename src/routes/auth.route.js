const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');
const googleAuth = require('../middlewares/googleAuth');
const instagramAuth = require('../middlewares/instagramAuth');
const facebookAuth = require('../middlewares/facebookAuth');
const logger = require('../config/logger');
const router = express.Router();

router
    .route('/send-invite')
    .post(validate(authValidation.sendInvite), authController.sendInvite);
router.post(
    '/register',
    validate(authValidation.register),
    authController.register
);
router.post(
    '/verify-email',
    validate(authValidation.verifyEmail),
    authController.verifyEmail
);
router.post('/login', validate(authValidation.login), authController.login);
router.delete(
    '/logout/:userId',
    validate(authValidation.logout),
    authController.logout
);

router.post(
    '/forgot-password',
    validate(authValidation.forgotPassword),
    authController.forgotPassword
);
router.post(
    '/reset-password',
    validate(authValidation.resetPassword),
    authController.resetPassword
);

router.post(
    '/change-password',
    validate(authValidation.changePassword),
    authController.changePassword
);
router.get('/google-auth', googleAuth);
router.get('/google/callback', googleAuth, authController.googleAuthHandler);
router.get('/instagram-auth', instagramAuth);
router.get('/instagram/callback', instagramAuth, (req, res) => {
    logger.info(req.body);
    res.send('success');
});
router.get('/facebook-auth', facebookAuth);
router.get(
    '/facebook/callback',
    facebookAuth,
    authController.facebookAuthHandler
);

module.exports = router;
