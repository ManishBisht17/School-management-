const mongoose = require('mongoose');
const User = require('../../server/models/User');
const Assignment = require('../../server/models/Assignment');
const Teacher = require('../../server/models/Teacher');
const mockData = require('./mockData');

// Clear the database before each test
const clearDatabase = async () => {
    await User.deleteMany({});
    await Assignment.deleteMany({});
    await Teacher.deleteMany({});
};

// Seed the database with mock data
const seedDatabase = async () => {
    const users = await User.insertMany(mockData.users);
    const assignments = await Assignment.insertMany(mockData.assignments);
    return { users, assignments };
};

module.exports = { clearDatabase, seedDatabase };