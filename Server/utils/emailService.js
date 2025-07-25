const nodemailer = require('nodemailer');
require('dotenv').config();




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "girikrishna0904@gmail.com" || process.env.MAIL_USER,
    pass: "rdzpivfmqjzltmei" || process.env.MAIL_PASS,
  },
});



exports.sendResetPasswordMail = async (email, token) => {
  const resetLink = `http://yourdomain.com/reset-password/${token}`;

  const mailOptions = {
    from: 'Your App <no-reply@yourapp.com>',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>We noticed multiple failed login attempts on your account.</p>
           <p>Please <a href="${resetLink}">click here</a> to reset your password.</p>
           <p>This link will expire in 1 hour.</p>`
  };

  await transporter.sendMail(mailOptions);
};


exports.sendOtpMail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: 'OTP Verification',
    text: `Your one-time password is: ${otp}`,
  });
};
