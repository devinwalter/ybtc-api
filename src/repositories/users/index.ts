import { PrismaClient, User } from '@prisma/client';

import { BaseRepository } from '../BaseRepository';

export class UserRepository extends BaseRepository<User> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.user);
  }

  async findByAuthId(authId: string): Promise<User | null> {
    return this.model.findUnique({ where: { authId } });
  }

  async upsertByAuthId(data: Partial<User>): Promise<User> {
    return this.model.upsert({
      where: { authId: data.authId },
      update: {
        name: data.name ?? undefined,
        email: data.email ?? undefined,
        avatarUrl: data.avatarUrl ?? undefined,
        favoriteType: data.favoriteType ?? undefined,
        favoriteMediaId: data.favoriteMediaId ?? undefined,
      },
      create: {
        authId: data.authId,
        email: data.email ?? null,
        name: data.name ?? null,
        avatarUrl: data.avatarUrl ?? undefined,
        favoriteType: data.favoriteType ?? undefined,
        favoriteMediaId: data.favoriteMediaId ?? undefined,
      },
    });
  }
}
