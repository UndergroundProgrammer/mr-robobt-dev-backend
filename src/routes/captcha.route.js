const express = require('express');
const { captchaController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .post(captchaController.createCaptcha)
    .get(captchaController.getCaptchas);
module.exports = router;
