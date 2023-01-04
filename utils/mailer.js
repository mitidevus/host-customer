const nodeMailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = require('../config/index');

const mailHost = "smtp.gmail.com";
const mailPort = 465;

const sendMail = (toEmail, subject, htmlContent) => {
    // Initialize a transporter object using standard SMTP transport protocol with the above configuration information.
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: true, // true for 465, false for other ports
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    const options = {
        from: `"OGANI 🏷" <${EMAIL_USER}>`, // sender address
        to: toEmail, // address to send to
        subject: subject, // Subject of the mail
        html: htmlContent, // The body of the mail I will use html instead of plain text
    };

    // transporter.sendMail() function will return a Promise
    return transporter.sendMail(options);
};

module.exports = {
    sendMail: sendMail,
};