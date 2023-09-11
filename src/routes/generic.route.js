const express = require("express");
const { DbInfoController, GenericController } = require("../controllers");
const mongoose = require("mongoose");
const router = express.Router();

router.route("/storage").get(DbInfoController.getStorage);
router.route("/storage").post(DbInfoController.createDbInfo);
router.route("/storage/:dbInfoId").put(DbInfoController.updateDbinfo);
router.route("/delete-table").delete(GenericController.getModelAndDeleteData);

module.exports = router;
