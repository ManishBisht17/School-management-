const request = require('supertest');
const app = require('../../server/app');
const Assignment = require('../../server/models/Assignment');
const { clearDatabase, seedDatabase } = require('../utils/testHelpers');

describe('Teacher APIs', () => {
    beforeAll(async () => {
        await clearDatabase(); // Clear the database
        await seedDatabase(); // Seed the database with mock data
    });

    it('should list all assignments submitted to a teacher', async () => {
        const res = await request(app)
            .get('/teacher/assignments')
            .set('X-Principal', JSON.stringify({ user_id: 3, teacher_id: 'teacher1' }));
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeInstanceOf(Array);
    });

    it('should grade an assignment', async () => {
        const res = await request(app)
            .post('/teacher/assignments/grade')
            .set('X-Principal', JSON.stringify({ user_id: 3, teacher_id: 'teacher1' }))
            .send({ id: 'assignment1', grade: 'A' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.grade).toEqual('A');
    });
});