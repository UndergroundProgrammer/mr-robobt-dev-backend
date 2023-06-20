const httpStatus = require('http-status');
const geoip = require('geoip-lite');
const { getName } = require('country-list');
const catchAsync = require('../utils/catchAsync');
const { VisitorServices } = require('../services');

const createVisitor = catchAsync(async (req, res) => {
    const ip =
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        'UNKNOWN';
    const geo = geoip.lookup(ip);
    const country = geo ? getName(geo.country) : 'UNKNOWN';

    const user = await VisitorServices.createVisitor({
        ipAddress: ip,
        country: country,
    });
    res.send(user);
});
const getVisitors = catchAsync(async (req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    const user = await VisitorServices.getVisitor(filter, options);
    res.status(200).send(user);
});

module.exports = {
    createVisitor,
    getVisitors,
};
