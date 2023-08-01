const express = require('express');
const { DbInfoController } = require('../controllers');
const router = express.Router();

router.route('/storage').get(DbInfoController.getStorage);
router.route('/storage').post(DbInfoController.createDbInfo);
router.route('/storage/:dbInfoId').put(DbInfoController.updateDbinfo);
module.exports = router;
