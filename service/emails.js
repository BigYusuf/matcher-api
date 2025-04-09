const nodemailer = require("nodemailer");
// const {
//   resetPasswordTemplate,
//   EmailTemplate3,
//   verifyEmailTemplate,
// } = require("../utils/emailTemplates");
//const { EmailTemplate, EmailTemplate2, EmailTemplate3 } = require('./emailTemplate/Template');

const dotenv = require("dotenv");

//setting up config file
dotenv.config();
async function sendMail1(email, firstName, OTP) {
  try {
    const transport = nodemailer.createTransport({
      service: "hotmail",
      secure: false,
      auth: {
        user: process.env.MASTER_EMAIL,
        pass: process.env.MASTER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: `Courier  <${process.env.MASTER_EMAIL}>`,
      to: ` ${firstName} <${email}>`,

      subject: "Account Created Successfully",
      html: `Hello ${firstName}, Your Account has been successfully created.
              <br/>
              Here is your OTP to verify your email.
              <h1>${OTP}</h1>
              `,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

// async function sendResetMail(first_name, email, token) {
//   try {
//     const transport = nodemailer.createTransport({
//       service: "hotmail",
//       secure: false,
//       auth: {
//         user: process.env.MASTER_EMAIL,
//         pass: process.env.MASTER_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });
//     const mailOptions = {
//       from: `Renta <${process.env.MASTER_EMAIL}>`,
//       to: `${email}`,

//       subject: `Reset Password`,
//       html: resetPasswordTemplate(first_name, token),
//     };
//     const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }

// async function sendMail3() {
//   try {
//     const transport = nodemailer.createTransport({
//       service: "hotmail",
//       secure: false,
//       auth: {
//         user: process.env.MASTER_EMAIL,
//         pass: process.env.MASTER_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });
//     const mailOptions = {
//       from: `${process.env.MASTER_EMAIL}`,
//       to: `${process.env.MASTER_EMAIL}`,

//       subject: `Testing case2`,
//       html: EmailTemplate3(),
//     };
//     const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }

module.exports = { sendMail1 }; // sendResetMail, sendMail3 };
