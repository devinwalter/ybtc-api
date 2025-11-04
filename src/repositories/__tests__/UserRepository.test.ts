import { MediaType } from '@prisma/client';

import { UserRepository } from '../users';

const createModel = () => ({
  findUnique: jest.fn(),
  upsert: jest.fn(),
});

describe('UserRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('findByAuthId delegates to model', async () => {
    const model = createModel();
    model.findUnique.mockResolvedValue({ id: '1' });

    const repo = new UserRepository({ user: model } as any);
    await expect(repo.findByAuthId('auth-1')).resolves.toEqual({ id: '1' });

    expect(model.findUnique).toHaveBeenCalledWith({ where: { authId: 'auth-1' } });
  });

  it('upsertByAuthId maps fields correctly', async () => {
    const model = createModel();
    const saved = { id: '1' };
    model.upsert.mockResolvedValue(saved);

    const repo = new UserRepository({ user: model } as any);
    const data = {
      authId: 'auth-1',
      name: 'Test',
      email: 'test@example.com',
      avatarUrl: 'avatar.png',
      favoriteType: MediaType.BOOK,
      favoriteMediaId: 'media-1',
    };

    await expect(repo.upsertByAuthId(data)).resolves.toBe(saved);

    expect(model.upsert).toHaveBeenCalledWith({
      where: { authId: 'auth-1' },
      update: {
        name: 'Test',
        email: 'test@example.com',
        avatarUrl: 'avatar.png',
        favoriteType: MediaType.BOOK,
        favoriteMediaId: 'media-1',
      },
      create: {
        authId: 'auth-1',
        email: 'test@example.com',
        name: 'Test',
        avatarUrl: 'avatar.png',
        favoriteType: MediaType.BOOK,
        favoriteMediaId: 'media-1',
      },
    });
  });
});
