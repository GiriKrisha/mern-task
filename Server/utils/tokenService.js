const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.createToken = (userId, email) => {
    console.log(userId,"userrrrrr", process.env.TOKEN_KEY)
   const token =jwt.sign({ id: userId , email: email}, process.env.TOKEN_KEY, {
    expiresIn: '3d',
  });
  console.log('token')
  return token;
};

exports.verifyToken = (token) =>
  jwt.verify(token, process.env.TOKEN_KEY);
