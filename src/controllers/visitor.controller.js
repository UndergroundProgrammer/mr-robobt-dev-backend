const httpStatus = require("http-status");
const geoip = require("geoip-lite");
const { getName } = require("country-list");
const catchAsync = require("../utils/catchAsync");
const { VisitorServices } = require("../services");
const pick = require("../utils/pick");
const { getActiveUsers } = require("../sockets");
const { searchQueryConverter } = require("../utils/searchQueryConverter");

const createVisitor = catchAsync(async (req, res) => {
  const ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "UNKNOWN";
  const geo = geoip.lookup(ip);
  const country = geo ? getName(geo.country) : "UNKNOWN";
  const user = await VisitorServices.createVisitor({
    ipAddress: ip,
    country: country,
  });
  res.send(user);
});
const getVisitors = catchAsync(async (req, res) => {
  let filter = pick(req.query, ["isActive", "search"]);
  if (filter.search) {
    let searchQuery = searchQueryConverter(filter.search);
    filter = {
      ...filter,
      ...searchQuery,
    };
    delete filter["search"];
  }
  if (filter.isActive) {
    const userIds = getActiveUsers().map((user) => user.userId);
    delete filter["isActive"];
    filter["_id"] = { $in: userIds };
  }
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  console.log(filter);
  const user = await VisitorServices.getVisitor(filter, options);
  res.status(200).send(user);
});

module.exports = {
  createVisitor,
  getVisitors,
};
