const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Contact = require('../models/contact.model');

const contactUs = async (contactData) => {
    const contact = await Contact.create(contactData);
    if (!contact) {
        throw new ApiError(500, 'Something went wrong');
    }
    return contact;
};
const getcontactForms = async (filters, options) => {
    const contact = await Contact.paginate(filters, options);
    return contact;
};
module.exports = {
    contactUs,
    getcontactForms,
};
