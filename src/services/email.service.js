const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const fs = require('fs');
const path = require('path');
const loadHtmlTemplate = require('../utils/LoadHtmlTemplate');
const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
    transport
        .verify()
        .then(() => logger.info('Connected to email server'))
        .catch(() =>
            logger.warn(
                'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
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
const sendEmail = async (to, subject, text, html) => {
    const msg = { from: config.email.from, to, subject, text, html };
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
    const subject = 'Reset Password';
    const resetpasswordEmailUrl = `${config.clientUrl}auth/reset_password?token=${token}`;
    const placeholder = {
        username: username,
        verificationLink: resetpasswordEmailUrl,
    };
    const html = loadHtmlTemplate('forgotPasswordTemplate.html', placeholder);

    await sendEmail(to, subject, html);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (username, to, token) => {
    const subject = 'Email Verification';
    const verificationEmailUrl = `${config.backendUrl}api/auth/verify-email?token=${token}`;
    const placeholder = {
        verificationLink: verificationEmailUrl,
        username: username,
    };
    const html = loadHtmlTemplate(
        'emailVerificationTemplate.html',
        placeholder
    );
    await sendEmail(to, subject, html);
};

const sendEmailOnCreateUser = async (to) => {
    const subject = 'New User Email Verification';
    const verificationEmailUrl = `link/verify-email`;
    const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
    await sendEmail(to, subject, text);
};
const sendSignupInvitationEmail = async (to, group, token) => {
    const subject = 'Signup invitation';
    const invitationEmailUrl = `${config.clientUrl}auth/signup?token=${token}&group=${group}`;
    const placeholder = {
        verificationLink: invitationEmailUrl,
    };
    const html = loadHtmlTemplate('signupInvitationTemplate.html', placeholder);

    await sendEmail(to, subject, html);
};

module.exports = {
    transport,
    sendEmail,
    sendResetPasswordEmail,
    sendVerificationEmail,
    sendEmailOnCreateUser,
    sendSignupInvitationEmail,
};
