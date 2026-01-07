const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // Yahan 74.125.142.108 wala IP kaam karega
            port: 587, 
            secure: false, // Port 587 ke liye false hona chahiye
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // Isse self-signed certificate errors nahi aayenge
            }
        });

        let info = await transporter.sendMail({
            from: `"StudyByte" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Email Sent: ", info);
        return info;
    } catch (error) {
        console.log("Error in mailSender: ", error.message);
        return error;
    }
}

module.exports = mailSender;