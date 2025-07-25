const mongoose = require('mongoose');


const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    code: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, 
    },
  },
  {
    timestamps: false, 
  }
);


const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;

