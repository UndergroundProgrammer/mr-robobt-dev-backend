const geoip = require("geoip-lite");
const { getName } = require("country-list");
const catchAsync = require("../utils/catchAsync");
const { CaptchaServices } = require("../services");
const pick = require("../utils/pick");
const { searchQueryConverter } = require("../utils/searchQueryConverter");
const createCaptcha = catchAsync(async (req, res) => {
  const ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "UNKNOWN";
  const geo = geoip.lookup(ip);
  const country = geo ? getName(geo.country) : "UNKNOWN";

  const captcha = await CaptchaServices.createCaptcha({
    userClassification: req.body.userClassification,
    ipAddress: ip,
    country: country,
    result: req.body.result,
  });
  res.send(captcha);
});
const getCaptchas = catchAsync(async (req, res) => {
  let filter = pick(req.query, ["search"]);
  if (filter.search) {
    let searchQuery = searchQueryConverter(filter.search);
    filter = {
      ...filter,
      ...searchQuery,
    };
    delete filter["search"];
  }
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const captchas = await CaptchaServices.getCaptcha(filter, options);
  res.status(200).send(captchas);
});

module.exports = {
  createCaptcha,
  getCaptchas,
};
