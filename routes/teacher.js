const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Assignment = require('../models/Assignment');

// Get teacher's assignments
router.get('/assignments', auth, async (req, res) => {
  try {
    const assignments = await Assignment.find({ teacherId: req.principal.teacher_id });
    res.json({ data: assignments });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Grade assignment
router.post('/assignments/grade', auth, async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.body.id, teacherId: req.principal.teacher_id },
      { grade: req.body.grade, state: 'GRADED' },
      { new: true }
    );

    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    res.json({ data: assignment });
  } catch (error) {
    res.status(400).json({ error: 'Grading failed' });
  }
});

module.exports = router;