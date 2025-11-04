import { prisma } from '@config/prisma';

import { attachUser } from '../attachUser';

const createResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;
  return res;
};

describe('attachUser middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 401 when auth payload is missing', async () => {
    const req = { auth: undefined } as any;
    const res = createResponse();
    const next = jest.fn();

    await attachUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No auth sub found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('attaches existing user and calls next', async () => {
    const user = { id: 'user-1' };
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(user);

    const req = { auth: { payload: { sub: 'auth-1' } } } as any;
    const res = createResponse();
    const next = jest.fn();

    await attachUser(req, res, next);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { authId: 'auth-1' },
    });
    expect(req.user).toBe(user);
    expect(next).toHaveBeenCalled();
  });

  it('creates user when none exists', async () => {
    const newUser = { id: 'user-2' };
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (prisma.user.create as jest.Mock).mockResolvedValueOnce(newUser);

    const req = { auth: { payload: { sub: 'auth-2' } } } as any;
    const res = createResponse();
    const next = jest.fn();

    await attachUser(req, res, next);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        authId: 'auth-2',
        email: null,
        name: null,
      },
    });
    expect(req.user).toBe(newUser);
    expect(next).toHaveBeenCalled();
  });

  it('handles errors by logging and returning 500', async () => {
    const error = new Error('failure');
    (prisma.user.findUnique as jest.Mock).mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const req = { auth: { payload: { sub: 'auth-3' } } } as any;
    const res = createResponse();
    const next = jest.fn();

    await attachUser(req, res, next);

    expect(consoleSpy).toHaveBeenCalledWith('Error attaching user', error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error attaching user.' });
    expect(next).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
