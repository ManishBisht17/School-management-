const express = require('express');
const Assignment = require('../models/Assignment');

const router = express.Router();

// GET /student/assignments
router.get('/assignments', async (req, res) => {
    const student_id = req.headers['x-principal'].student_id;
    const assignments = await Assignment.find({ student_id });
    res.json({ data: assignments });
});

// POST /student/assignments
router.post('/assignments', async (req, res) => {
    const student_id = req.headers['x-principal'].student_id;
    const assignment = new Assignment({ ...req.body, student_id });
    await assignment.save();
    res.json({ data: assignment });
});

// POST /student/assignments/submit
router.post('/assignments/submit', async (req, res) => {
    const { id, teacher_id } = req.body;
    const assignment = await Assignment.findByIdAndUpdate(
        id,
        { state: 'SUBMITTED', teacher_id },
        { new: true }
    );
    res.json({ data: assignment });
});

module.exports = router;