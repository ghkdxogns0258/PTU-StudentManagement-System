const express = require('express');
const { Student, User, University } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');
const counselingController = require('../controllers/counselingController');

const router = express.Router();

// ✅ 특정 학생 정보 조회 API
router.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findOne({
            where: { userId: req.params.id }, // 🔍 userId를 기반으로 검색
            include: [{ model: User, attributes: ['name'] }, { model: University, attributes: ['name'] }],
        });

        if (!student) {
            return res.status(404).json({ error: "학생 정보를 찾을 수 없습니다." });
        }

        return res.status(200).json(student);
    } catch (error) {
        console.error("❌ 학생 정보 조회 오류:", error.message);
        return res.status(500).json({ error: "서버 오류 발생" });
    }
});
router.get('/basic', authMiddleware.verifyToken, studentController.getStudentBasicInfo);
router.post('/students/:id/counseling/schedule', authMiddleware.verifyToken, counselingController.createCounselingSchedule);

module.exports = router;
