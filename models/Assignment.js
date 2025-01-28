const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  state: { type: String, enum: ['DRAFT', 'SUBMITTED', 'GRADED'], default: 'DRAFT' },
  grade: { type: String, enum: ['A', 'B', 'C', 'D', 'F', null], default: null },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);