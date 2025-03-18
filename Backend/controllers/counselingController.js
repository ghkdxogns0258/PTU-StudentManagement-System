const { CounselingSchedule, CounselingRequest } = require('../models/counseling');

// ✅ 상담 일정 등록
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

// ✅ 상담 요청 등록
exports.createRequest = async (req, res) => {
    try {
        const { studentId, professorId, title, memo } = req.body;
        const request = await CounselingRequest.create({ studentId, professorId, title, memo, status: 'pending' });
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create request' });
    }
};

// ✅ 상담 요청 상세 조회
exports.getRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await CounselingRequest.findByPk(id);
        if (!request) return res.status(404).json({ error: 'Request not found' });
        res.json(request);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch request' });
    }
};

// ✅ 상담 요청 승인/거절
exports.updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'approved' or 'rejected'
        if (!['approved', 'rejected'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
        const updated = await CounselingRequest.update({ status }, { where: { id } });
        if (updated[0] === 0) return res.status(404).json({ error: 'Request not found' });
        res.json({ message: `Request ${status} successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update request status' });
    }
};
