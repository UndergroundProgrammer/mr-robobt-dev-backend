const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { pricingItemsValidations } = require('../validations');
const { pricingItemsController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .post(
        validate(pricingItemsValidations.addItem),
        pricingItemsController.addItem
    )
    .get(pricingItemsController.getAllItems);

module.exports = router;
