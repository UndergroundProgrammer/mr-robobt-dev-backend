const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");
const fs = require("fs");
const path = require("path");
const loadHtmlTemplate = require("../utils/LoadHtmlTemplate");
const emailContentGenerator = require("../utils/emailContentGenerator");
const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch(() =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, html, from = config.email.from) => {
  const msg = { from, to, subject, html };
  await transport.sendMail(msg);
  return msg;
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, username, token) => {
  const subject = "Reset Password";
  const resetpasswordEmailUrl = `${config.clientUrl}auth/reset_password?token=${token}`;
  const unsubscribLink = `${config.clientUserUrl}unsubnewsletter`;
  const placeholder = {
    username: username,
    verificationLink: resetpasswordEmailUrl,
    unsubscribeLink: unsubscribLink,
  };
  const html = loadHtmlTemplate("forgotPasswordTemplate.html", placeholder);

  await sendEmail(to, subject, html);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (username, to, token) => {
  const subject = "Email Verification";
  const verificationEmailUrl = `${config.backendUrl}api/auth/verify-email?token=${token}`;
  const unsubscribLink = `${config.clientUserUrl}unsubnewsletter`;

  const placeholder = {
    verificationLink: verificationEmailUrl,
    username: username,
    unsubscribeLink: unsubscribLink,
  };
  const html = loadHtmlTemplate("emailVerificationTemplate.html", placeholder);
  await sendEmail(to, subject, html);
};

const sendEmailOnCreateUser = async (to) => {
  const subject = "New User Email Verification";
  const verificationEmailUrl = `link/verify-email`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};
const sendSignupInvitationEmail = async (to, group, token) => {
  const subject = "Signup invitation";
  const unsubscribLink = `${config.clientUserUrl}unsubnewsletter`;
  const invitationEmailUrl = `${config.clientUrl}auth/signup?token=${token}&group=${group}`;
  const placeholder = {
    verificationLink: invitationEmailUrl,
    unsubscribeLink: unsubscribLink,
  };
  const html = loadHtmlTemplate("signupInvitationTemplate.html", placeholder);

  await sendEmail(to, subject, html);
};
const sendChatLinkEmail = async (to, name, token) => {
  const subject = "Chat Receipt";
  const chatLink = `${config.clientUserUrl}?chatlink=${token}`;
  const unsubscribLink = `${config.clientUserUrl}unsubnewsletter`;
  const placeholder = {
    username: name,
    verificationLink: chatLink,
    unsubscribeLink: unsubscribLink,
  };
  const html = loadHtmlTemplate("chatLinkTemplate.html", placeholder);

  await sendEmail(to, subject, html);
};

const sendNewsLetterSubscribedEmail = async (to) => {
  const unsubscribLink = `${config.clientUserUrl}unsubnewsletter`;
  const subject = "NewsLetter Subscription";
  const placeholder = {
    unsubscribeLink: unsubscribLink,
  };
  const html = loadHtmlTemplate(
    "newsLetterSubscriptionTemplate.html",
    placeholder
  );
  await sendEmail(to, subject, html);
};
const sendNewsLetterSendEmailToAllSbscriptors = async (users, newsletter) => {
  const unsubscribLink = `${config.clientUserUrl}unsubnewsletter`;
  const subject = "NewsLetter";
  const placeholder = {
    unsubscribeLink: unsubscribLink,
    newsLetterTitle: newsletter.name,
    newsLetterImg: newsletter.logo,
    newsLetterContent: newsletter.description,
  };
  const html = loadHtmlTemplate("newsLetterSendTemplate.html", placeholder);
  const emailPromise = users.map((user) => {
    sendEmail(user.email, subject, html);
  });
  await Promise.all(emailPromise);
};

const sendNotificationmail = async (emails,contactDetail) => {
  const contentHtml = emailContentGenerator(contactDetail);
  const unsubscribLink = `${config.clientUserUrl}unsubnewsletter`;
  const subject = "Notification via Mr. Robot dev";
  const placeholder = {
    unsubscribeLink: unsubscribLink,
    content: contentHtml,
  };
  const html = loadHtmlTemplate("notificationTemplate.html", placeholder);
  if(emails.length>0){
    const emailPromise = emails.map((email) => {
      sendEmail(email.email, subject, html);
    });
    await Promise.all(emailPromise);
  }
  // await sendEmail(config.email.to, subject, html);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailOnCreateUser,
  sendSignupInvitationEmail,
  sendChatLinkEmail,
  sendNewsLetterSubscribedEmail,
  sendNewsLetterSendEmailToAllSbscriptors,
  sendNotificationmail,
};
