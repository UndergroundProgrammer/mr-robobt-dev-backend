const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { contactValidations } = require('../validations');
const { contactController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .post(validate(contactValidations.contactUs), contactController.contactus)
    .get(contactController.getContactsForms);

module.exports = router;
