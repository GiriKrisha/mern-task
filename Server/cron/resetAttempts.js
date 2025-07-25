

const cron = require('node-cron');
const User = require('../models/user');
const { sendResetPasswordMail } = require('../utils/emailService');
const crypto = require('crypto');


cron.schedule('0 */3 * * *', async () => {
// cron.schedule('* * * * *', async () => {
  try {
    // 1. Find users with >= 3 failed attempts
    const users = await User.find({ failedLoginAttempts: { $gte: 3 } });
    console.log('userrrr', users);
    for (const user of users) {
      const resetToken = crypto.randomBytes(32).toString('hex');


      console.log('usrrmmaaa', user.email, resetToken);
      await sendResetPasswordMail(user.email, resetToken);
      console.log(`Password reset mail sent to ${user.email}`);
    }
    // 4. Reset their failed attempts
    await User.updateMany(
      { failedLoginAttempts: { $gte: 3 } },
      { $set: { failedLoginAttempts: 0, lastAttempt: null } }
    );

    console.log('Reset emails sent and failed attempts cleared');
  } catch (error) {
    console.error('Cron job error:', error);
  }
});
