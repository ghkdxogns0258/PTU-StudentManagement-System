const db = require('../config/db');

exports.getUserById = (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(results[0]);
    });
};

exports.getUserProfile = (req, res) => {
    const userId = req.user.userId;

    db.query('SELECT id, username, role FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(results[0]);
    });
};

exports.getUniversities = (req, res) => {
    db.query('SELECT id, name FROM universities', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
};

exports.getStudentBasicInfo = (req, res) => {
    const userId = req.user.userId;

    db.query('SELECT name, grade, major, phoneNumber FROM students WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'Student not found' });
        res.json(results[0]);
    });
};
