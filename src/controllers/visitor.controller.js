const httpStatus = require('http-status');
const geoip = require('geoip-lite');
const catchAsync = require('../utils/catchAsync');
const { VisitorServices } = require('../services');

const createVisitor = catchAsync(async (req, res) => {
    const ip =
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        '';
    const geo = geoip.lookup(ip);
    const country = geo ? geo.country : 'UNKNOWN';

    const user = await VisitorServices.createVisitor({
        ipAddress: ip,
        country: country,
    });
    res.send(user);
});

module.exports = {
    createVisitor,
};
