const axios = require('axios');                              //카카오 로그인 API 구현, 구현 파일: authController.js
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.kakaoLogin = async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'Authorization code is required' });

    try {
        // 카카오 액세스 토큰 요청
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_CLIENT_ID,
                redirect_uri: process.env.KAKAO_REDIRECT_URI,
                code,
            },
        });

        const accessToken = tokenResponse.data.access_token;

        // 카카오 사용자 정보 요청
        const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const kakaoUser = userResponse.data;
        const kakaoId = kakaoUser.id;

        // DB에서 사용자 조회
        db.query('SELECT * FROM users WHERE kakao_id = ?', [kakaoId], (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            let user;
            if (results.length > 0) {
                user = results[0];
            } else {
                user = { kakao_id: kakaoId, role: 'student' }; // 기본 역할 student
                db.query('INSERT INTO users SET ?', user);
            }

            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.json({ jwt: token, isNewUser: results.length === 0, user });
        });
    } catch (error) {
        res.status(500).json({ error: 'Kakao authentication failed' });
    }
};
