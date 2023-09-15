const express = require("express");
const validate = require("../middlewares/validate");
const { logsValidation } = require("../validations");
const { LogsController } = require("../controllers");

const router = express.Router();

router
  .route("/")
  .post(validate(logsValidation.addLog), LogsController.addLog)
  .get(LogsController.getAllLogs);
router
  .route("/:logId")
  .get(validate(logsValidation.LogById), LogsController.getLog)
  .put(validate(logsValidation.LogById), LogsController.updateLog)
  .delete(validate(logsValidation.LogById), LogsController.deleteLog);

module.exports = router;
