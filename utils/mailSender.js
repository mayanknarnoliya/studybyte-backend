const nodemailer = require("nodemailer");

// Mail sender function
const mailSender = async (email, title, body) => {
    try {
        // Brevo SMTP transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,                 // env se pick karega
            secure: process.env.MAIL_SECURE === "true",  // env ke hisaab se TLS
            auth: {
                user: process.env.MAIL_USER,   // "apikey"
                pass: process.env.MAIL_PASS,   // Brevo SMTP key
            },
        });

        let info = await transporter.sendMail({
            from: process.env.MAIL_FROM,       // StudyByte <verified-email@gmail.com>
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent: ", info.messageId);
        return info;
    } catch (error) {
        console.log("Error sending mail: ", error.message);
        return null;
    }
}

module.exports = mailSender;
