const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/kakao', authController.kakaoLogin);

module.exports = router;
