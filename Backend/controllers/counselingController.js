const { CounselingSchedule } = require('../models/counseling');

// ✅ 학생 상담 기록 조회
exports.getCounselingHistory = (req, res) => {
    const userId = req.user.userId;

    db.query('SELECT date, title, memo FROM counseling WHERE student_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
};

// ✅ 상담 일정 등록 (지도학생 상세 메뉴로 이동)
exports.createSchedule = async (req, res) => {
    try {
        const { professorId, studentId, date, time, location } = req.body;
        const schedule = await CounselingSchedule.create({ professorId, studentId, date, time, location });
        res.status(201).json(schedule);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create schedule' });
    }
};

// ✅ 상담 일정 조회
exports.getSchedules = async (req, res) => {
    try {
        const schedules = await CounselingSchedule.findAll();
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch schedules' });
    }
};

// ✅ 상담 일정 수정
exports.updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await CounselingSchedule.update(req.body, { where: { id } });
        if (updated[0] === 0) return res.status(404).json({ error: 'Schedule not found' });
        res.json({ message: 'Schedule updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update schedule' });
    }
};

// ✅ 상담 일정 삭제
exports.deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await CounselingSchedule.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ error: 'Schedule not found' });
        res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete schedule' });
    }
};

exports.createCounselingSchedule = (req, res) => {
    const { professorId, studentId, date, time, location } = req.body;

    db.query(
        'INSERT INTO counseling_schedule (professor_id, student_id, date, time, location) VALUES (?, ?, ?, ?, ?)',
        [professorId, studentId, date, time, location],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(201).json({ message: '상담 일정이 성공적으로 등록되었습니다.' });
        }
    );
};
