import { Media } from '@prisma/client';

import { MediaRepository } from '@/repositories';

import { BaseService } from '../BaseService';

export class MediaService extends BaseService<Media> {
  constructor(repository: MediaRepository) {
    super(repository);
  }

  // example of custom
  async listByType(type: string): Promise<Media[]> {
    return (this.repository as MediaRepository).findByType(type);
  }
}
