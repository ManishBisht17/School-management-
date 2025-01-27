module.exports = {
    users: [
        { username: 'principal1', role: 'PRINCIPAL' },
        { username: 'student1', role: 'STUDENT' },
        { username: 'teacher1', role: 'TEACHER' },
    ],
    assignments: [
        { content: 'Math Homework', student_id: 'student1', teacher_id: 'teacher1', grade: 'A' },
        { content: 'Science Project', student_id: 'student2', teacher_id: 'teacher1', grade: 'B' },
        { content: 'History Essay', student_id: 'student3', teacher_id: 'teacher2', grade: 'A' },
    ],
};