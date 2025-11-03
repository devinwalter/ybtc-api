import { PrismaClient, Review } from '@prisma/client';

import { BaseRepository } from '../BaseRepository';

export class ReviewRepository extends BaseRepository<Review> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.review);
  }
}
