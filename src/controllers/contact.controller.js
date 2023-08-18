const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, contactService } = require('../services');
const { searchQueryConverter } = require('../utils/searchQueryConverter');
const { sendNotificationmail } = require('../services/email.service');

const contactus = catchAsync(async (req, res) => {
    const contact = await contactService.contactUs(req.body);
    await sendNotificationmail(req.body);
    res.send(contact);
});
const getContactsForms = catchAsync(async (req, res) => {
    let filter = pick(req.query, ['type', 'search']);
    if (filter.search) {
        let searchQuery = searchQueryConverter(filter.search);
        filter = {
            ...filter,
            ...searchQuery,
        };
        delete filter['search'];
    }
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    Object.assign(options, {
        populate: 'appPricing.service,appPrincing.functionalities',
    });
    const contacts = await contactService.getcontactForms(filter, options);
    if (!contacts) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong');
    }
    res.send(contacts);
});
module.exports = {
    contactus,
    getContactsForms,
};
