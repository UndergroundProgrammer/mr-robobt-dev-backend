const express = require('express');
const { visitorController } = require('../controllers');

const router = express.Router();

router.route('/').get(visitorController.createVisitor);
router.route('/users', visitorController.getVisitors);
module.exports = router;
