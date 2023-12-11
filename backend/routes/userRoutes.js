const express = require('express');
const { loginUser, registerUser } = require('../controllers/userController.js');
// const { protect, getMe } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
// router.get('/me', protect, getMe);

module.exports = router;
