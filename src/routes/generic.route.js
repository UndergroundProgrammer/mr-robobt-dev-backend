const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const genericController = require('../controllers/generic.controller');
const auth = require('../middlewares/auth');
const googleAuth = require('../middlewares/googleAuth');
const instagramAuth = require('../middlewares/instagramAuth');
const facebookAuth = require('../middlewares/facebookAuth');
const logger = require('../config/logger');
const router = express.Router();

router.route('/storage').get(genericController.getStorage);

module.exports = router;
