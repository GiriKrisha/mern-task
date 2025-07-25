const User = require('../models/user');
const Otp = require('../models/otp');
const { createToken } = require('../utils/tokenService');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    const data = req.body;

    if (await User.findOne({ where: { email: data.email } })) {
        return res.status(400).json({ message: 'Email already registered' });
    }

    if (data.email) {
        const emailEnrypt = await bcrypt.hash(data.password, 12);
        console.log('emailEncrypttt', emailEnrypt);
        data.password = emailEnrypt;
    }

    console.log("dataaaaa",data);

    const user = await User.create({
        ...data,
        isEmailVerified: true,
    });
    console.log('createddataaa', data)
    const token = createToken(user.userId);
    return res.status(201).json({ token, userId: user.userId });
};


const MAX_ATTEMPTS = 3;
const LOCKOUT_PERIOD = 3 * 60 * 60 * 1000; // 3 hours in ms
// const LOCKOUT_PERIOD = 60000; 

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isEmailVerified) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }


    if (
        user.failedLoginAttempts >= MAX_ATTEMPTS &&
        user.lastAttempt &&
        Date.now() - user.lastAttempt.getTime() < LOCKOUT_PERIOD
    ) {
        return res.status(429).json({
            message: 'Too many attempts. Please try again after 3 hours.',
        });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        user.failedLoginAttempts += 1;
        user.lastAttempt = new Date();
        await user.save();
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    user.failedLoginAttempts = 0;
    user.lastAttempt = null;
    await user.save();
    console.log("user.emailll", user);
    const token = createToken(user.userId, user.email);
    return res.status(200).json({ token });
};