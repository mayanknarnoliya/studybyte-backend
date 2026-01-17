const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, 
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );
    // Use ?. to safely access response. This prevents the TypeError.
    console.log("Email sent successfully: ", mailResponse?.response);
  } catch (error) {
    console.error("Error occurred while sending email: ", error.message);
    throw error;
  }
}

// Pre-save hook: Note that 'this' refers to the document being saved
OTPSchema.pre("save", async function (next) {
  console.log("New document saved to database");

  if (this.isNew) {
    try {
      await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
      console.error("Failed to send verification email during save hook.");
    }
  }
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);