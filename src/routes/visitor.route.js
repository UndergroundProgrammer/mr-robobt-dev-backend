const express = require('express');
const { visitorController } = require('../controllers');

const router = express.Router();

router.route('/').get(visitorController.createVisitor);

module.exports = router;
