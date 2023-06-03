const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, contactService } = require('../services');

const contactus = catchAsync(async (req, res) => {
    const contact = await contactService.contactUs(req.body);
    if (!contact) {
        throw new ApiError(500, 'Something went wrong');
    }
    res.send(contact);
});
const getContactsForms = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    Object.assign(options,{populate:"appPricing.service,appPrincing.functionalities"})
    const contacts = await contactService.getcontactForms(filter,options);
    if (!contacts) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong');
    }
    res.send(contacts);
});
module.exports = {
    contactus,
    getContactsForms,
};
