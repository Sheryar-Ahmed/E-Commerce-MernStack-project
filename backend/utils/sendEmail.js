const nodeMailer = require('nodemailer');


// options is an object with email, subject and a message;
const SendEmail = async (options) => {
    //create transporter
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS,
        }
    });

    //here are some mail options
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    //send email
    await transporter.sendMail(mailOptions);
};


module.exports = SendEmail;