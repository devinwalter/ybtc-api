import express from 'express';
import request from 'supertest';

const requireAuthMock = jest.fn((_: express.Request, __: express.Response, next: express.NextFunction) =>
  next(),
);
const attachUserMock = jest.fn((req: any, _: express.Response, next: express.NextFunction) => {
  req.user = { id: 'user' };
  next();
});

jest.mock('@/middleware', () => ({
  requireAuth: requireAuthMock,
  attachUser: attachUserMock,
}));

const mediaRouter = express.Router().get('/', (_req, res) => res.json({ route: 'media' }));
const userRouter = express.Router().get('/', (_req, res) => res.json({ route: 'users' }));
const reviewRouter = express.Router().get('/', (_req, res) => res.json({ route: 'reviews' }));

jest.mock('../media', () => mediaRouter);
jest.mock('../users', () => userRouter);
jest.mock('../reviews', () => reviewRouter);

describe('API routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('protects mounted routers with auth middleware', async () => {
    let router: express.Router;
    jest.isolateModules(() => {
      router = require('../index').default;
    });

    const app = express();
    app.use(router!);

    await request(app).get('/media');
    await request(app).get('/users');
    await request(app).get('/reviews');

    expect(requireAuthMock).toHaveBeenCalledTimes(3);
    expect(attachUserMock).toHaveBeenCalledTimes(3);
  });
});
