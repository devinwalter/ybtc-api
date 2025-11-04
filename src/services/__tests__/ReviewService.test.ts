import { getConnectorForType } from '@/connectors/factory';

import { ReviewService } from '../reviews';

jest.mock('@/connectors/factory', () => ({
  getConnectorForType: jest.fn(),
}));

describe('ReviewService', () => {
  const reviewRepository = {
    create: jest.fn().mockResolvedValue({ id: 'review-1' }),
  };
  const mediaRepository = {
    findOrCreateByExternalId: jest.fn().mockResolvedValue({ id: 'media-1' }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a review after ensuring media exists', async () => {
    (getConnectorForType as jest.Mock).mockReturnValue('connector');

    const service = new ReviewService(reviewRepository as any, mediaRepository as any);

    const payload = {
      externalId: 'ext-1',
      provider: 'OPEN_LIBRARY',
      title: 'Title',
      metadata: {},
      contentfulId: 'cf-1',
      rating: 5,
      type: 'BOOK' as any,
    };

    const result = await service.createReview('user-1', payload);

    expect(getConnectorForType).toHaveBeenCalledWith('BOOK');
    expect(mediaRepository.findOrCreateByExternalId).toHaveBeenCalledWith(
      'OPEN_LIBRARY',
      'ext-1',
      'connector',
    );
    expect(reviewRepository.create).toHaveBeenCalledWith({
      userId: 'user-1',
      mediaId: 'media-1',
      contentfulId: 'cf-1',
      rating: 5,
    });
    expect(result).toEqual({ id: 'review-1' });
  });
});
