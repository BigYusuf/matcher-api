const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
const {
  verifyEmailTemplate,
  resetPasswordTemplate,
  PromoTemplate,
  OrderTemplate,
} = require("../emailTemplates/emailTemplate.js");

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(userEmail, OTP) {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: `Coral Courier  <${process.env.SMTP_MAIL}>`,
      to: ` <${userEmail}>`,

      subject: `Account Succesfully created`,
      html: verifyEmailTemplate(userEmail, OTP),
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
async function sendOrderMail(userEmail, tracker, userName) {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: `Coral Courier  <${process.env.SMTP_MAIL}>`,
      to: ` <${userEmail}>`,

      subject: `Order Succesfully created`,
      html: OrderTemplate(userName, tracker),
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function sendResetMail(req, user, userEmail, userName) {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: `Coral Courier  <${process.env.SMTP_MAIL}>`,
      to: `${userName} <${userEmail}>`,

      subject: `Reset Password ${userName}`,
      html: resetPasswordTemplate(user, req),
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function sendEmail1(req, user, userEmail, userName) {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: `Coral Courier  <${process.env.SMTP_MAIL}>`,
      to: `${userName} <${userEmail}>`,

      subject: `Send Promo email to ${userName}`,
      html: PromoTemplate(user, req),
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = {
  sendMail,
  sendResetMail,
  sendEmail1,
  sendOrderMail,
};
