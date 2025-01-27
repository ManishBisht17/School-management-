const request = require('supertest');
const app = require('../../server/app');
const Assignment = require('../../server/models/Assignment');
const { clearDatabase, seedDatabase } = require('../utils/testHelpers');

describe('Student APIs', () => {
    beforeAll(async () => {
        await clearDatabase(); // Clear the database
        await seedDatabase(); // Seed the database with mock data
    });

    it('should list all assignments for a student', async () => {
        const res = await request(app)
            .get('/student/assignments')
            .set('X-Principal', JSON.stringify({ user_id: 1, student_id: 'student1' }));
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeInstanceOf(Array);
    });

    it('should create a new assignment', async () => {
        const res = await request(app)
            .post('/student/assignments')
            .set('X-Principal', JSON.stringify({ user_id: 2, student_id: 'student2' }))
            .send({ content: 'Math Homework' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.content).toEqual('Math Homework');
    });

    it('should submit an assignment to a teacher', async () => {
        const res = await request(app)
            .post('/student/assignments/submit')
            .set('X-Principal', JSON.stringify({ user_id: 1, student_id: 'student1' }))
            .send({ id: 'assignment1', teacher_id: 'teacher1' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.state).toEqual('SUBMITTED');
    });
});