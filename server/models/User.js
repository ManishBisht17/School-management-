const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['PRINCIPAL', 'STUDENT', 'TEACHER'] },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;