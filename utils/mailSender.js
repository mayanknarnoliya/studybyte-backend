const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // Render par timeout se bachne ke liye direct 'service' use karein
        let transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS, // Make sure this is 16-digit App Password
            },
        });

        let info = await transporter.sendMail({
            from: `"StudyByte" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Nodemailer Info: ", info);
        return info;
    }
    catch (error) {
        // Agar yahan 'ETIMEDOUT' aata hai, toh password ya network ka issue hai
        console.log("Error in mailSender: ", error.message);
        return null; 
    }
}

module.exports = mailSender;