const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    state: { type: String, default: 'DRAFT', enum: ['DRAFT', 'SUBMITTED', 'GRADED'] },
    grade: { type: String },
}, { timestamps: true });

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;