const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description('Mongo DB url'),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which verify email token expires'),
        JWT_CHAT_LINK_EXPIRATION_DAYS: Joi.number()
            .default(90)
            .description('days after which chat link expires'),
        SMTP_HOST: Joi.string().description('server that will send the emails'),
        SMTP_PORT: Joi.number().description(
            'port to connect to the email server'
        ),
        SMTP_USERNAME: Joi.string().description('username for email server'),
        SMTP_PASSWORD: Joi.string().description('password for email server'),
        EMAIL_FROM: Joi.string().description(
            'the from field in the emails sent by the app'
        ),
        GOOGLE_CLIENT_ID: Joi.string().description('client id for google'),
        GOOGLE_CLIENT_SECRET: Joi.string().description(
            'Client secert for google'
        ),
        INSTAGRAM_CLIENT_ID: Joi.string().description(
            'client id for instagram'
        ),
        INSTAGRAM_CLIENT_SSECRET: Joi.string().description(
            'Client secert for instagram'
        ),
        FACEBOOK_CLEINT_ID: Joi.string().description('client id for FACEBBOK'),
        FACEBOOK_CLIENT_SECRET: Joi.string().description(
            'Client secert for facebook'
        ),
        CLIENT_URL: Joi.string().description('Client side url'),
        BACKEND_URL: Joi.string().description('Backend url'),
        CLIENT_USER_URL: Joi.string().description('Client user url'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    clientUrl: envVars.CLIENT_URL,
    backendUrl: envVars.BACKEND_URL,
    clientUserUrl: envVars.CLIENT_USER_URL,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        resetPasswordExpirationMinutes:
            envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes:
            envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
        chatLinkExpirationDays: envVars.JWT_CHAT_LINK_EXPIRATION_DAYS,
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.EMAIL_FROM,
    },
    google: {
        clientId: envVars.GOOGLE_CLIENT_ID,
        clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    },
    instagram: {
        clientId: envVars.INSTAGRAM_CLIENT_ID,
        clientSecret: envVars.INSTAGRAM_CLIENT_SSECRET,
    },
    facebook: {
        clientId: envVars.FACEBOOK_CLEINT_ID,
        clientSecret: envVars.FACEBOOK_CLIENT_SECRET,
    },
};
