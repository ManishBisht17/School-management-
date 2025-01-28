const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Assignment = require('../models/Assignment');

// Get all teachers
router.get('/teachers', auth, async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' });
    res.json({ data: teachers });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all assignments
router.get('/assignments', auth, async (req, res) => {
  try {
    const assignments = await Assignment.find({ 
      state: { $in: ['SUBMITTED', 'GRADED'] } 
    });
    res.json({ data: assignments });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Regrade assignment
router.post('/assignments/grade', auth, async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.body.id,
      { grade: req.body.grade },
      { new: true }
    );
    
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    res.json({ data: assignment });
  } catch (error) {
    res.status(400).json({ error: 'Regrade failed' });
  }
});

module.exports = router;