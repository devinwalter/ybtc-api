import express from 'express';
import request from 'supertest';

const requireAuthMock = jest.fn(
  (_: express.Request, __: express.Response, next: express.NextFunction) => next(),
);
const attachUserMock = jest.fn((req: any, _: express.Response, next: express.NextFunction) => {
  req.user = { id: 'user-1' };
  next();
});

jest.mock('@/middleware', () => ({
  requireAuth: requireAuthMock,
  attachUser: attachUserMock,
}));

const routesRouter = express.Router().get('/health', (_req, res) => res.json({ ok: true }));

jest.mock('@/routes', () => routesRouter);

describe('app', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns service status and attaches user on root route', async () => {
    let app: express.Express;
    jest.isolateModules(() => {
      app = require('../app').default;
    });

    const response = await request(app!).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'You Be The Critic API is live.',
      user: { id: 'user-1' },
    });
    expect(requireAuthMock).toHaveBeenCalled();
    expect(attachUserMock).toHaveBeenCalled();
  });

  it('mounts versioned API routes', async () => {
    let app: express.Express;
    jest.isolateModules(() => {
      app = require('../app').default;
    });

    const response = await request(app!).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});
