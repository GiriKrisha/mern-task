const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getProfile = async (req, res) => {
  const { user } = req;
  return res.status(200).json({
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    mobile: user.mobile,
  });
};

exports.updatePassword = async (req, res) => {
  const data= req.body;
  console.log(data, "dataaa");
  let existingUser;
 try {
   existingUser = await User.findOne({email:data.email});
    console.log('existinguserr', existingUser);
} catch (err) {
  console.error('Error checking user:', err);
  return res.status(500).json({ message: 'Server error' });
}

 console.log('data.currentPassword', data.currentPassword, existingUser.password);
  const valid = await bcrypt.compare(data.currentPassword, existingUser.password);
  if (!valid) {
    return res.status(400).json({ message: 'Current password incorrect' });
  }
   console.log('validddd', valid)
          const emailEnrypt = await bcrypt.hash(data.newPassword, 12);
          console.log('emailEncrypttt', emailEnrypt);
          existingUser.password = emailEnrypt;
  const updatePass = await existingUser.save();
  console.log(updatePass,'resssss');
  return res.status(200).json({ message: 'Password updated' });
};
