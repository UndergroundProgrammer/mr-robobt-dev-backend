const express = require('express');
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
router
    .route('/:itemId')
    .get(
        validate(pricingItemsValidations.ItemById),
        pricingItemsController.getItem
    )
    .put(
        validate(pricingItemsValidations.updateItem),
        pricingItemsController.updateItem
    )
    .delete(
        validate(pricingItemsValidations.ItemById),
        pricingItemsController.deleteItem
    );

module.exports = router;
