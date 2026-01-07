const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, // 587 ke liye false hi rahega
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            // Isse connection wait karega aur fail nahi hoga turant
            connectionTimeout: 10000, 
            greetingTimeout: 10000,
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transporter.sendMail({
            from: `"StudyByte" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Email Sent Successfully");
        return info;
    } catch (error) {
        console.log("Detailed Error in mailSender: ", error);
        return error;
    }
}

module.exports = mailSender;