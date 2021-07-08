const nodemailer = require('nodemailer');
const recoveryPasswordTemplate = require('./templates/recoveryPassword');
const bulletinTables = require('./templates/bulletinEmail');
const validateEmailTemplate = require('./templates/validateEmail');
const verificationCodeTemplate = require('./templates/verificationCode');
const verificationCodeRegisterTemplate = require('./templates/verificationCodeRegister');
const assignPasswordTemplate = require('./templates/assignPassword');
const supportMessageTemplate = require('./templates/supportEmail');
const welcomeFree = require('./templates/welcome/welcomeFree');
const welcomeInvitedPremium = require('./templates/welcome/welcomeInvitedPremium');
const welcomePremiumTeam = require('./templates/welcome/welcomePremiumTeam');
const welcomePremiumSingle = require('./templates/welcome/welcomePremiumSingle');
const welcomeTrial = require('./templates/welcome/welcomeTrial');
const threeDaysRemainingTrialMessage = require('./templates/threeDaysRemainigTrial');
const oneDayRemainingTrialMessage = require('./templates/oneDayRemainingTrial');
const oauth = require('../oauth');
const { GCP, SUPPORT_EMAIL } = require('../constants');
const translate = require('./i18n.json');


module.exports = {
  async sendAssignPassword({ id, email, name, language }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: 'Bienvenido a GO-YA!',
      html: assignPasswordTemplate(id, name, language),
    };

    transporter.sendMail(config, callback);
  },

  async sendRecoveryPassword({ token, email, language }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: translate.subjectRecovery[language],
      html: recoveryPasswordTemplate(token, language),
    };

    transporter.sendMail(config, callback);
  },

  async sendValidationEmail({ token, email, name, application }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: `Hola ${name}, accede a este link para verificar tu correo electrónico`,
      html: validateEmailTemplate(token, name, application),
    };

    transporter.sendMail(config, callback);
  },

  async sendVerificationCode({ token, email, language }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: translate.subjectVerificationCode[language],
      html: verificationCodeTemplate(token, language),
    };

    transporter.sendMail(config, callback);
  },

  async sendVerificationCodeRegister({ token, email, name, application, language }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: translate.subjectVerificationCodeRegister[language],
      html: verificationCodeRegisterTemplate(token, name, application, language),
    };

    transporter.sendMail(config, callback);
  },

  async sendSupportMessage({ name, email, message, type_user }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: SUPPORT_EMAIL,
      subject: 'Support Message',
      html: supportMessageTemplate(name, email, message, type_user),
    };

    transporter.sendMail(config, callback);
  },

  async sendTableBulletin({ language, data, email, isConfigured }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: 'EMEAT Daily Pricing Bulletin',
      html: bulletinTables(data, isConfigured, language),
    };

    transporter.sendMail(config, callback);
  },

  async sendWelcomeMessage({ name, email }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: 'Thank you for subscribing to EMEAT',
      html: welcomeFree(name),
    };

    transporter.sendMail(config, callback);
  },

  async sendWelcomeTrialMessage({ name, email }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: 'Thank you for subscribing to EMEAT',
      html: welcomeTrial(name),
    };

    transporter.sendMail(config, callback);
  },

  async sendWelcomeInvitedPremiumMessage({ name, email, module }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: 'Thank you for activating your EMEAT account',
      html: welcomeInvitedPremium(name, email, module),
    };

    transporter.sendMail(config, callback);
  },

  async sendWelcomePremiumTeamMessage({ name, email, module }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: 'Thank you for subscribing to EMEAT',
      html: welcomePremiumTeam(name, module),
    };

    transporter.sendMail(config, callback);
  },

  async sendWelcomePremiumSingleMessage({ name, email, module }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: 'Thank you for subscribing to EMEAT',
      html: welcomePremiumSingle(name, module),
    };

    transporter.sendMail(config, callback);
  },

  async sendThreeDaysRemainingTrialMessage({ name, email }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: 'Your Premium 14-Day Free Trial expires in 3 days',
      html: threeDaysRemainingTrialMessage(name),
    };

    transporter.sendMail(config, callback);
  },

  async sendOneDayRemainingTrialMessage({ name, email }, callback) {
    const settings = await oauth.getSettings();
    const transporter = nodemailer.createTransport(settings);

    const config = {
      from: GCP.user,
      to: email,
      subject: 'Your Premium 14-Day Free Trial expires tomorrow',
      html: oneDayRemainingTrialMessage(name),
    };

    transporter.sendMail(config, callback);
  },
};
