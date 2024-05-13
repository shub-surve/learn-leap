const nodemailer = require('nodemailer');
const mailgen = require('mailgen');
const { EMAIL, PASSWORD } = require('./mail.js');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});

async function sendRegistrationEmail(email, username) {
    try {
        let mailOptions = {
            from: EMAIL,
            to: email,
            subject: 'Welcome to LearnNleap!',
            text: `Hi ${username},\n\nThank you for registering with LearnNleap! We're excited to have you on board.`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to send registration email");
    }
}

module.exports = { sendRegistrationEmail };