const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const LogsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    group: {
      type: String,
      trim: true,
    },
    log: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
LogsSchema.plugin(toJSON);
LogsSchema.plugin(paginate);

/**
 * @typedef User
 */
const Logs = mongoose.model("Logs", LogsSchema);
module.exports = Logs;
