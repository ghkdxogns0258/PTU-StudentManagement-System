const express = require('express');
const router = express.Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// ✅ Swagger 옵션 설정
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Counseling API",
            version: "1.0.0",
            description: "교수-학생 상담 시스템 API 문서",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    apis: [path.join(__dirname, "./apiDocs.js")], // ✅ 현재 문서를 API 문서화 대상으로 지정
};

// ✅ Swagger 문서 생성
const swaggerDocs = swaggerJsdoc(swaggerOptions);
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: 로그인 관련 API
 *   - name: User Settings
 *     description: 유저 설정 API
 *   - name: Client
 *     description: 클라이언트 페이지 API
 *   - name: Dashboard
 *     description: 대시보드 API
 */

// ======================= 로그인 시도 제한 (Brute Force 방어) =======================
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: ✅ 로그인 API (Brute Force 방어 포함)
 *     tags: [Auth]
 *     description: "JWT를 사용하여 사용자 로그인. 로그인 시도 제한 포함."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: "학생 ID"
 *               password:
 *                 type: string
 *                 description: "비밀번호"
 *     responses:
 *       200:
 *         description: "로그인 성공"
 *       403:
 *         description: "로그인 시도 제한 초과"
 *       401:
 *         description: "잘못된 인증 정보"
 */

// ======================= 카카오 OAuth 로그인 =======================
/**
 * @swagger
 * /api/auth/kakao:
 *   post:
 *     summary: ✅ 카카오 로그인 처리
 *     tags: [Auth]
 *     description: "카카오 로그인 인증 후 JWT 토큰을 발급합니다."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 description: "카카오 인증을 위한 액세스 토큰"
 *     responses:
 *       200:
 *         description: "로그인 성공, JWT 토큰 반환"
 *       400:
 *         description: "잘못된 요청, 카카오 토큰 유효하지 않음"
 *       500:
 *         description: "서버 오류"
 */


// ======================= 로그인 페이지 =======================
/**
 * @swagger
 * /api/auth/kakao:
 *   post:
 *     summary: ✅ 카카오 로그인 처리
 *     tags: [Auth]
 *     description: "카카오 로그인 인증 후 JWT 토큰을 발급합니다."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 description: "카카오 인증을 위한 액세스 토큰"
 *     responses:
 *       200:
 *         description: "로그인 성공, JWT 토큰 반환"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "로그인 성공 메시지"
 *                 token:
 *                   type: string
 *                   description: "JWT 토큰"
 *       400:
 *         description: "잘못된 요청, 카카오 토큰 유효하지 않음"
 *       500:
 *         description: "서버 오류"
 */
router.post('/api/auth/kakao', async (req, res) => {
    const { accessToken } = req.body;
    try {
        const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const { id, kakao_account } = response.data;
        
        const sql = `INSERT INTO users (login_Id, role, identifier, name, email) 
                     VALUES (?, 'student', ?, ?, ?) 
                     ON DUPLICATE KEY UPDATE name=?, email=?`;
        
        db.query(sql, [id, id, kakao_account.profile.nickname, kakao_account.email,
                        kakao_account.profile.nickname, kakao_account.email], (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            
            const token = jwt.sign({ userId: id }, 'secretKey', { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        });
    } catch (error) {
        res.status(400).json({ error: 'Invalid Kakao token' });
    }
});

// ======================= 유저 설정 세팅 페이지 =======================
/**
 * @swagger
 * /api/universities:
 *   get:
 *     summary: ✅ 대학교 목록 조회
 *     tags: [User Settings]
 *     description: "모든 대학교 목록을 조회합니다."
 *     responses:
 *       200:
 *         description: "대학교 목록"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   university_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 */
router.get('/api/universities', (req, res) => {
    const sql = 'SELECT * FROM universities';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

/**
 * @swagger
 * /api/professors:
 *   get:
 *     summary: ✅ 학생이 선택할 수 있는 저장된 지도 교수 목록 조회
 *     tags: [User Settings]
 *     description: "학생의 학과에 맞는 교수 목록을 조회합니다."
 *     parameters:
 *       - in: query
 *         name: department
 *         description: "학생의 학과"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "교수 목록"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   professor_id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/api/professors', (req, res) => {
    const { department } = req.query;
    const sql = 'SELECT * FROM professor WHERE department = ?';
    db.query(sql, [department], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

// ======================= 클라이언트 페이지 =======================
/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: ✅ 학생 기본 정보 조회
 *     tags: [Client]
 *     description: "학생의 기본 정보를 조회합니다."
 *     parameters:
 *       - in: path
 *         name: id
 *         description: "학생 ID"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "학생 정보"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 student_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 department:
 *                   type: string
 */
router.get('/api/students/:id', (req, res) => {
    const sql = 'SELECT * FROM student WHERE student_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Student not found' });
        res.json(results[0]);
    });
});

/**
 * @swagger
 * /api/grades/{id}:
 *   put:
 *     summary: ✅ 학점 수정
 *     tags: [Client]
 *     description: "학생의 학점을 수정합니다."
 *     parameters:
 *       - in: path
 *         name: id
 *         description: "학생 ID"
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: grade
 *         description: "수정할 학점 정보"
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             course_code:
 *               type: string
 *             grade:
 *               type: string
 *     responses:
 *       200:
 *         description: "학점 수정 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: "잘못된 요청"
 *       404:
 *         description: "학생 또는 수업을 찾을 수 없음"
 */
router.put('/api/grades/:id', (req, res) => {
    const { course_code, grade } = req.body;
    const sql = 'UPDATE grade SET grade=? WHERE student_id=? AND course_code=?';
    db.query(sql, [grade, req.params.id, course_code], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Grade updated successfully' });
    });
});

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: ✅ 상담 예약
 *     tags: [Client]
 *     description: "학생이 교수와 상담을 예약합니다."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               professorId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: "상담 예약 성공"
 *       500:
 *         description: "데이터베이스 오류"
 */

router.post('/api/appointments', (req, res) => {
    const { studentId, professorId, date, reason } = req.body;
    const sql = 'INSERT INTO appointments (studentId, professorId, date, reason) VALUES (?, ?, ?, ?)';
    db.query(sql, [studentId, professorId, date, reason], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json({ message: 'Counseling session booked successfully' });
    });
});

/**
 * @swagger
 * /api/professors/{id}/appointments:
 *   get:
 *     summary: ✅ 교수 상담 일정 조회
 *     tags: [Client]
 *     description: "특정 교수의 상담 일정을 조회합니다."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "교수 ID"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "상담 일정 반환"
 *       500:
 *         description: "데이터베이스 오류"
 */

router.get('/api/professors/:id/appointments', (req, res) => {
    const sql = 'SELECT * FROM appointments WHERE professorId = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});


/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: ✅ 상담 삭제
 *     tags: [Client]
 *     description: "예약된 상담을 삭제합니다."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "상담 ID"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "상담 삭제 성공"
 *       404:
 *         description: "해당 상담을 찾을 수 없음"
 *       500:
 *         description: "데이터베이스 오류"
 */

router.delete('/api/appointments/:id', (req, res) => {
    const sql = 'DELETE FROM appointments WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Appointment deleted successfully' });
    });
});

// ======================= 대시보드 페이지 =======================
/**
 * @swagger
 * /api/professors/{id}/students:
 *   get:
 *     summary: ✅ 지도학생 목록 조회
 *     tags: [Dashboard]
 *     description: "지도 교수의 학생 목록을 조회합니다."
 *     parameters:
 *       - in: path
 *         name: id
 *         description: "교수 ID"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "지도학생 목록"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   student_id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/api/professors/:id/students', (req, res) => {
    const sql = 'SELECT * FROM advising_student WHERE professor_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

/**
 * @swagger
 * /api/career/{id}:
 *   get:
 *     summary: ✅ 진로 정보 조회
 *     tags: [Dashboard]
 *     description: "학생의 진로 정보를 조회합니다."
 *     parameters:
 *       - in: path
 *         name: id
 *         description: "학생 ID"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "진로 정보"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 career_goals:
 *                   type: string
 */

router.get('/api/career/:id', (req, res) => {
    const sql = 'SELECT * FROM career WHERE student_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Career information not found' });
        res.json(results[0]);
    });
});


/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: ✅ 학생 정보 조회
 *     tags: [Dashboard]
 *     description: "학생의 기본 정보를 조회합니다."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "학생 ID"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "학생 정보 반환"
 *       404:
 *         description: "해당 학생을 찾을 수 없음"
 */

router.get('/api/students/:id', (req, res) => {
    const sql = 'SELECT * FROM students WHERE student_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Student not found' });
        res.json(results[0]);
    });
});

/**
 * @swagger
 * /api/grades/{student_number}:
 *   get:
 *     summary: ✅ 학점 조회
 *     tags: [Dashboard]
 *     description: "특정 학생의 학점 정보를 조회합니다."
 *     parameters:
 *       - in: path
 *         name: student_number
 *         required: true
 *         description: "학생의 학번"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "학점 조회 성공"
 *       404:
 *         description: "해당 학생의 학점 정보 없음"
 */

router.get('/api/completed_credits/:id', (req, res) => {
    const sql = 'SELECT * FROM completed_credits WHERE student_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Completed credits not found' });
        res.json(results[0]);
    });
});


/**
 * @swagger
 * /api/completed_credits/{student_number}:
 *   get:
 *     summary: ✅ 이수 학점 조회
 *     tags: [Dashboard]
 *     description: "특정 학생의 이수 학점 정보를 조회합니다."
 *     parameters:
 *       - in: path
 *         name: student_number
 *         required: true
 *         description: "학생의 학번"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "이수 학점 조회 성공"
 *       404:
 *         description: "해당 학생의 이수 학점 정보 없음"
 */

router.get('/api/completed_credits/:id', (req, res) => {
    const sql = 'SELECT * FROM completed_credits WHERE student_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Completed credits not found' });
        res.json(results[0]);
    });
});


module.exports = router;
