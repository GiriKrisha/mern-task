require('dotenv').config();
require('./cron/resetAttempts');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();



mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: 'Too many requests, please try again later.',
});
app.use(['/api/auth', '/api/user'], limiter);


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const otpRoutes = require('./routes/otpRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/otp', otpRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
