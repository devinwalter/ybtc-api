import { Media, MediaType, PrismaClient } from '@prisma/client';

import { MediaConnector } from '@/types/media';

import { BaseRepository } from '../BaseRepository';

export class MediaRepository extends BaseRepository<Media> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.media);
  }

  override async findAll(): Promise<Media[]> {
    return this.model.findMany({
      include: {
        _count: {
          select: { reviews: true },
        },
      },
    });
  }

  // example of custom query
  async findByType(type: string): Promise<Media[]> {
    return this.model.findMany({ where: { type } });
  }

  async findOrCreateByExternalId(
    provider: string,
    externalId: string,
    connector?: MediaConnector,
  ): Promise<Media> {
    const existing = await this.model.findFirst({
      where: {
        externals: { some: { provider, externalId } },
        include: { externals: true },
      },
    });

    if (existing) {
      return existing;
    }

    let mediaData: Partial<Media> = {};

    if (connector) {
      const external = await connector.getById(externalId);

      if (external) {
        mediaData = {
          title: external.title,
          type: external.type as MediaType,
          metadata: {
            autor: external.author,
            year: external.year,
            coverUrl: external.coverUrl,
          },
        };
      }
    }

    return this.model.create({
      data: {
        ...mediaData,
        externals: {
          create: { provider, externalId },
        },
      },
      include: { externals: true },
    });
  }
}
