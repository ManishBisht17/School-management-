const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Assignment = require('../models/Assignment');

// Get all student assignments
router.get('/assignments', auth, async (req, res) => {
  try {
    const assignments = await Assignment.find({ studentId: req.principal.student_id });
    res.json({ data: assignments });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create/Update assignment
router.post('/assignments', auth, async (req, res) => {
  try {
    const assignmentData = {
      content: req.body.content,
      studentId: req.principal.student_id,
      state: 'DRAFT'
    };

    let assignment;
    if (req.body.id) {
      assignment = await Assignment.findOneAndUpdate(
        { _id: req.body.id, studentId: req.principal.student_id },
        assignmentData,
        { new: true }
      );
    } else {
      assignment = new Assignment(assignmentData);
      await assignment.save();
    }

    res.json({ data: assignment });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// Submit assignment
router.post('/assignments/submit', auth, async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.body.id, studentId: req.principal.student_id },
      { teacherId: req.body.teacher_id, state: 'SUBMITTED' },
      { new: true }
    );
    
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    res.json({ data: assignment });
  } catch (error) {
    res.status(400).json({ error: 'Submission failed' });
  }
});

module.exports = router;