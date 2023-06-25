const express = require('express');
const validate = require('../middlewares/validate');
const { newslettersValidation } = require('../validations');
const { newsLettersController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .post(
        validate(newslettersValidation.addNewsletter),
        newsLettersController.addNewsLetter
    )
    .get(newsLettersController.getAllNewsLetters);
router
    .route('/:newsletterId')
    .get(
        validate(newslettersValidation.NewsletterById),
        newsLettersController.getNewsLetter
    )
    .put(
        validate(newslettersValidation.NewsletterById),
        newsLettersController.updateNewsLetter
    )
    .delete(
        validate(newslettersValidation.NewsletterById),
        newsLettersController.deleteNewsLetter
    );

module.exports = router;
