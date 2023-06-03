const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('./custom.validation');

const addItem = {
    body: Joi.object({
        name: Joi.string().trim(),
        price: Joi.number().required(),
        description: Joi.string().trim(),
        logo: Joi.string().trim(),
        type: Joi.string()
            .valid('Functionality', 'Device', 'Service')
            .required(),
            
    }),
};

module.exports = {
    addItem,
};
