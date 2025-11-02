import { Media, PrismaClient } from '@prisma/client';

import { BaseRepository } from '../BaseRepository';

export class MediaRepository extends BaseRepository<Media> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.media);
  }

  // example of custom query
  async findByType(type: string): Promise<Media[]> {
    return this.model.findMany({ where: { type } });
  }
}
