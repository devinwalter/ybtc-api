import { Request, Response } from 'express';

import { BaseController } from '../BaseController';

class TestController extends BaseController<{ id: string }> {
  constructor(service: any) {
    super(service);
  }
}

const createResponse = () => {
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as unknown as Response;

  return res;
};

describe('BaseController', () => {
  const service = {
    list: jest.fn().mockResolvedValue(['item']),
    get: jest.fn().mockResolvedValue('item'),
    create: jest.fn().mockResolvedValue('created'),
    update: jest.fn().mockResolvedValue('updated'),
    delete: jest.fn().mockResolvedValue('deleted'),
  };
  const controller = new TestController(service);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lists items', async () => {
    const res = createResponse();
    await controller.list({} as Request, res);
    expect(service.list).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(['item']);
  });

  it('gets an item', async () => {
    const res = createResponse();
    await controller.get({ params: { id: '1' } } as unknown as Request, res);
    expect(service.get).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith('item');
  });

  it('creates an item', async () => {
    const res = createResponse();
    const req = { body: { name: 'test' } } as Request;
    await controller.create(req, res);
    expect(service.create).toHaveBeenCalledWith({ name: 'test' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith('created');
  });

  it('updates an item', async () => {
    const res = createResponse();
    const req = { params: { id: '1' }, body: { name: 'new' } } as unknown as Request;
    await controller.update(req, res);
    expect(service.update).toHaveBeenCalledWith('1', { name: 'new' });
    expect(res.json).toHaveBeenCalledWith('updated');
  });

  it('deletes an item', async () => {
    const res = createResponse();
    const req = { params: { id: '1' } } as unknown as Request;
    await controller.delete(req, res);
    expect(service.delete).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith('deleted');
  });
});
