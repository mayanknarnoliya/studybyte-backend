const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // Ensure this is smtp.gmail.com
            port: 587,                   // Port specifically define karein
            secure: false,               // 587 ke liye false hi rahega
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            // TLS settings connection timeout rokne mein help karti hain
            tls: {
                rejectUnauthorized: false,
                minVersion: "TLSv1.2"
            }
        });

        let info = await transporter.sendMail({
            from: `"StudyByte" <${process.env.MAIL_USER}>`, // Proper format
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Nodemailer Info: ", info);
        return info;
    }
    catch (error) {
        console.log("Error in mailSender: ", error.message);
        return null; // Error aane par null return karein taaki OTP.js crash na ho
    }
}

module.exports = mailSender;