import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../../../../app.js';

describe('GET /internal/api/v1/automatisch/version', () => {
  it('should return Automatisch version', async () => {
    const response = await request(app)
      .get('/internal/api/v1/automatisch/version')
      .expect(200);

    const expectedPayload = {
      data: {
        version: '0.14.0',
      },
      meta: {
        count: 1,
        currentPage: null,
        isArray: false,
        totalPages: null,
        type: 'Object',
      },
    };

    expect(response.body).toStrictEqual(expectedPayload);
  });
});
