import { UserService } from '../users';

describe('UserService', () => {
  it('calls repository to get or create user', async () => {
    const repository = {
      upsertByAuthId: jest.fn().mockResolvedValue({ id: 'user-1' }),
    };

    const service = new UserService(repository as any);
    const data = { authId: 'auth-1' };

    await expect(service.getOrCreateUserFromAuth(data)).resolves.toEqual({ id: 'user-1' });
    expect(repository.upsertByAuthId).toHaveBeenCalledWith(data);
  });
});
