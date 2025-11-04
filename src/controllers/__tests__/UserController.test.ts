import { UserController } from '../users';

describe('UserController', () => {
  const service = {
    getOrCreateUserFromAuth: jest.fn().mockResolvedValue({ id: 'user-1' }),
  };
  const controller = new UserController(service as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates or syncs user from auth payload', async () => {
    const req = { body: { authId: 'auth-1' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.createOrSync(req, res);

    expect(service.getOrCreateUserFromAuth).toHaveBeenCalledWith({ authId: 'auth-1' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 'user-1' });
  });

  it('returns 401 when user is missing', async () => {
    const req = { user: undefined } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.me(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('returns user when present', async () => {
    const user = { id: 'user-1' };
    const req = { user } as any;
    const res = { json: jest.fn() } as any;

    await controller.me(req, res);

    expect(res.json).toHaveBeenCalledWith(user);
  });
});
