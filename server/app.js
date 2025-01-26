const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const principalRoutes = require('./routes/principal');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/auth', authRoutes);
app.use('/principal', principalRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);

// Home Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;