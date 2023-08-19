const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const CompanyStatsSchema = mongoose.Schema(
  {
    countries: {
      type: Number,
      trim: true,
    },
    totalEmployes: {
      type: Number,
      trim: true,
    },
    monthlyTraffic: {
      type: String,
      trim: true,
    },
    brands: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
CompanyStatsSchema.plugin(toJSON);
CompanyStatsSchema.plugin(paginate);

/**
 * @typedef User
 */
const CompanyStats = mongoose.model("CompanyStats", CompanyStatsSchema);
module.exports = CompanyStats;
