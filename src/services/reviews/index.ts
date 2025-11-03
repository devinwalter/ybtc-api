import { Review } from '@prisma/client';

import { getConnectorForType } from '@/connectors/factory';
import { MediaType } from '@/constants';
import { MediaRepository, ReviewRepository } from '@/repositories';

import { BaseService } from '../BaseService';

export class ReviewService extends BaseService<Review> {
  protected mediaRepository: MediaRepository;

  constructor(reviewRepository: ReviewRepository, mediaRepository: MediaRepository) {
    super(reviewRepository);
    this.mediaRepository = mediaRepository;
  }

  async createReview(
    userId: string,
    data: {
      externalId: string;
      provider: string;
      title: string;
      metadata?: any;
      contentfulId: string;
      rating: number;
      type: MediaType;
    },
  ): Promise<Review> {
    const media = await this.mediaRepository.findOrCreateByExternalId(
      data.provider,
      data.externalId,
      getConnectorForType(data.type),
    );

    return await this.repository.create({
      userId,
      mediaId: media.id,
      contentfulId: data.contentfulId,
      rating: data.rating,
    });
  }
}
