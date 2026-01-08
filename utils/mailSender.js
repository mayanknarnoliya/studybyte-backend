const nodemailer = require("nodemailer");

// Mail sender function
const mailSender = async (email, title, body) => {
    try {
        // Brevo SMTP transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,       // smtp-relay.brevo.com
            port: process.env.MAIL_PORT,       // 587
            secure: false,                     // TLS nahi chahiye 587 ke liye
            auth: {
                user: process.env.MAIL_USER,   // "apikey" (literal)
                pass: process.env.MAIL_PASS,   // Brevo SMTP key
            },
        });

        // Mail options
        let info = await transporter.sendMail({
            from: process.env.MAIL_FROM,       // StudyByte <verified-email@gmail.com>
            to: email,                         // User ka email
            subject: title,
            html: body,                        // HTML content
        });

        console.log("Email sent: ", info.messageId);
        return info;
    } catch (error) {
        console.log("Error sending mail: ", error.message);
        return null;
    }
}

module.exports = mailSender;
