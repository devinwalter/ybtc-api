import { User } from '@prisma/client';

import { UserRepository } from '@/repositories';

import { BaseService } from '../BaseService';

export class UserService extends BaseService<User> {
  constructor(repository: UserRepository) {
    super(repository);
  }

  async getByAuthId(authId: string): Promise<User | null> {
    return (this.repository as UserRepository).findByAuthId(authId);
  }

  async getOrCreateUserFromAuth(data: Partial<User>): Promise<User> {
    return (this.repository as UserRepository).upsertByAuthId(data);
  }
}
