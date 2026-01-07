const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT) || 465, // Direct 465 use karein Render ke liye
            secure: true, // 465 ke saath true zaroori hai
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transporter.sendMail({
            from: '"StudyByte" <mayanknarnoliya41@gmail.com>', // Proper format
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Email Info: ", info);
        return info;
    } catch (error) {
        console.log("Error in mailSender: ", error.message);
        return error; // Error return karein taaki crash na ho
    }
}

module.exports = mailSender;