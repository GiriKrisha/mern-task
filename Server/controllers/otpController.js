const Otp = require('../models/otp');
const crypto = require('crypto');
const { sendOtpMail } = require('../utils/emailService');

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const code = crypto.randomInt(100000, 999999).toString();


  await Otp.create({ email, code });


  await sendOtpMail(email, code);

  return res.status(200).json({ message: 'OTP sent' });
};

exports.verifyOtp = async (req, res) => {
  const { email, code } = req.body;

  const record = await Otp.findOne({ email, code });
  if (!record) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  return res.status(200).json({ message: 'OTP verified' });
};
