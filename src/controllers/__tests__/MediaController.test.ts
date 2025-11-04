import type { Response } from 'express';

import { MediaController } from '../media';

describe('MediaController', () => {
  const service = {
    listByType: jest.fn().mockResolvedValue(['media']),
  };
  const controller = new MediaController(service as any);

  const createRes = () => {
    const res = {
      json: jest.fn().mockReturnThis(),
    } as Partial<Response>;

    return res as Response;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gets media by type', async () => {
    const res = createRes();
    const req = { params: { type: 'BOOK' } } as any;

    await controller.getByType(req, res);

    expect(service.listByType).toHaveBeenCalledWith('BOOK');
    expect(res.json).toHaveBeenCalledWith(['media']);
  });
});
