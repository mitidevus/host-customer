const mailer = require("../utils/mailer");

const sendMail = async (clientEmail, subject, content) => {
    try {
        // Send mail
        await mailer.sendMail(clientEmail, subject, content);
        return "Send mail successfully";
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = {
    sendMail: sendMail,
};