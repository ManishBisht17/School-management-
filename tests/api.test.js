const request = require('supertest');
const app = require('../server');
const Assignment = require('../models/Assignment');

describe('Student API', () => {
  beforeEach(async () => {
    await Assignment.deleteMany({});
  });

  it('should create a draft assignment', async () => {
    const res = await request(app)
      .post('/api/student/assignments')
      .set('X-Principal', JSON.stringify({ user_id: 1, student_id: 1 }))
      .send({ content: 'Test Assignment' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.state).toBe('DRAFT');
  });
});