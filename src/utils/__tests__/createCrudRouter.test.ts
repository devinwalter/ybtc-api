import express from 'express';
import request from 'supertest';

import { createCrudRouter } from '../createCrudRouter';

describe('createCrudRouter', () => {
  const controller = {
    list: jest.fn((_: express.Request, res: express.Response) => res.json({ route: 'list' })),
    get: jest.fn((req: express.Request, res: express.Response) =>
      res.json({ route: 'get', id: req.params.id }),
    ),
    create: jest.fn((_: express.Request, res: express.Response) =>
      res.status(201).json({ route: 'create' }),
    ),
    update: jest.fn((_: express.Request, res: express.Response) =>
      res.json({ route: 'update' }),
    ),
    delete: jest.fn((_: express.Request, res: express.Response) =>
      res.json({ route: 'delete' }),
    ),
  };

  const customHandler = jest.fn((_: express.Request, res: express.Response) =>
    res.json({ route: 'custom' }),
  );

  const app = express();
  app.use(
    '/',
    createCrudRouter({
      controller: controller as any,
      extend: (router) => {
        router.get('/custom', customHandler);
      },
    }),
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('wires standard CRUD routes to controller methods', async () => {
    await request(app).get('/');
    expect(controller.list).toHaveBeenCalled();

    await request(app).get('/123');
    expect(controller.get).toHaveBeenCalled();

    await request(app).post('/');
    expect(controller.create).toHaveBeenCalled();

    await request(app).put('/123');
    expect(controller.update).toHaveBeenCalled();

    await request(app).delete('/123');
    expect(controller.delete).toHaveBeenCalled();
  });

  it('applies additional routes from extend callback', async () => {
    await request(app).get('/custom');
    expect(customHandler).toHaveBeenCalled();
  });

  it('creates router without extend callback', async () => {
    const simpleController = {
      list: jest.fn((_: express.Request, res: express.Response) => res.json({})),
      get: jest.fn((_: express.Request, res: express.Response) => res.json({})),
      create: jest.fn((_: express.Request, res: express.Response) => res.json({})),
      update: jest.fn((_: express.Request, res: express.Response) => res.json({})),
      delete: jest.fn((_: express.Request, res: express.Response) => res.json({})),
    };

    const router = createCrudRouter({ controller: simpleController as any });
    const simpleApp = express();
    simpleApp.use(router);

    await request(simpleApp).get('/');

    expect(simpleController.list).toHaveBeenCalled();
  });
});
