const express = require("express");
const validate = require("../middlewares/validate");
const { companyStatsValidation } = require("../validations");
const { CompanyStatsController } = require("../controllers");

const router = express.Router();

router
  .route("/")
  .post(
    validate(companyStatsValidation.addState),
    CompanyStatsController.addState
  )
  .get(CompanyStatsController.getAllState);
router
  .route("/:stateId")
  .get(
    validate(companyStatsValidation.StateById),
    CompanyStatsController.getState
  )
  .put(
    validate(companyStatsValidation.StateById),
    CompanyStatsController.updateState
  )
  .delete(
    validate(companyStatsValidation.StateById),
    CompanyStatsController.deleteState
  );

module.exports = router;
