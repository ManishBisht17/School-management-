const express = require('express');
const Teacher = require('../models/Teacher');
const Assignment = require('../models/Assignment');

const router = express.Router();

// GET /principal/teachers
router.get('/teachers', async (req, res) => {
    const teachers = await Teacher.find().populate('user_id');
    res.json({ data: teachers });
});

// GET /principal/assignments
router.get('/assignments', async (req, res) => {
    const assignments = await Assignment.find();
    res.json({ data: assignments });
});

// POST /principal/assignments/grade
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