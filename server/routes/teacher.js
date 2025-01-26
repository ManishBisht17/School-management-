const express = require('express');
const Assignment = require('../models/Assignment');

const router = express.Router();

// GET /teacher/assignments
router.get('/assignments', async (req, res) => {
    const teacher_id = req.headers['x-principal'].teacher_id;
    const assignments = await Assignment.find({ teacher_id });
    res.json({ data: assignments });
});

// POST /teacher/assignments/grade
router.post('/assignments/grade', async (req, res) => {
    const { id, grade } = req.body;
    const assignment = await Assignment.findByIdAndUpdate(
        id,
        { grade, state: 'GRADED' },
        { new: true }
    );
    res.json({ data: assignment });
});

module.exports = router;