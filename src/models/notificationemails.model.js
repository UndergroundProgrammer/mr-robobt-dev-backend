const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const NotificationEmailsSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
NotificationEmailsSchema.plugin(toJSON);
NotificationEmailsSchema.plugin(paginate);

/**
 * @typedef User
 */
const NotificationEmails = mongoose.model("NotificationEmails", NotificationEmailsSchema);
module.exports = NotificationEmails;
