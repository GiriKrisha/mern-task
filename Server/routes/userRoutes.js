const router = require('express').Router();
const { getProfile, updatePassword } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/profile', authenticate, getProfile);
router.put('/password', updatePassword);

module.exports = router;
