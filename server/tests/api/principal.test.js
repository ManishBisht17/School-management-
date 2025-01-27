const request = require('supertest');
const app = require('../../server/app');
const Assignment = require('../../server/models/Assignment');
const { clearDatabase, seedDatabase } = require('../utils/testHelpers');

describe('Principal APIs', () => {
    beforeAll(async () => {
        await clearDatabase(); // Clear the database
        await seedDatabase(); // Seed the database with mock data
    });

    it('should count grade A assignments by teacher with max grading', async () => {
        const result = await Assignment.aggregate([
            { $match: { grade: 'A' } }, // Filter assignments with grade 'A'
            { $group: { _id: '$teacher_id', grade_A_count: { $sum: 1 } } }, // Group by teacher_id and count
            { $sort: { grade_A_count: -1 } }, // Sort by grade_A_count in descending order
            { $limit: 1 } // Limit to the top result
        ]);

        expect(result[0].grade_A_count).toBeGreaterThanOrEqual(1); // At least one grade 'A' assignment
    });

    it('should count assignments in each grade', async () => {
        const result = await Assignment.aggregate([
            { $group: { _id: '$grade', assignment_count: { $sum: 1 } } } // Group by grade and count
        ]);

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: 'A', assignment_count: expect.any(Number) }),
                expect.objectContaining({ _id: 'B', assignment_count: expect.any(Number) }),
            ])
        );
    });
});