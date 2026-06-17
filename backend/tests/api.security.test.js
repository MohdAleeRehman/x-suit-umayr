import request from 'supertest';
import app from '../src/server.js';

describe('API Security and Single-User Constraints', () => {
  test('GET /api/health should return success', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('running');
  });

  test('POST /api/auth/register should not exist', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'x', email: 'x@x.com', password: 'password123' });

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/auth/login should validate required fields', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'umair' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('Validation failed');
  });

  test('POST /api/auth/login should reject non-superadmin username', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'notumair', password: 'Au_Q9090' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('GET /api/records should require Bearer token', async () => {
    const res = await request(app).get('/api/records');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/pdf/share-payload should require Bearer token', async () => {
    const res = await request(app)
      .post('/api/pdf/share-payload')
      .send({ moduleType: 'sale', title: 'Report' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
