const request = require('supertest');
const app = require('../../server/app');
const User = require('../../server/models/User');
const { clearDatabase, seedDatabase } = require('../utils/testHelpers');

describe('Auth APIs', () => {
    beforeAll(async () => {
        await clearDatabase(); // Clear the database
        await seedDatabase(); // Seed the database with mock data
    });

    it('should authenticate a user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'principal1', password: 'password123' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeDefined();
    });
});