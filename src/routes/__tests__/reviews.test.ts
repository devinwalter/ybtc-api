const reviewRepoInstance = {};
const mediaRepoInstance = {};
const serviceInstance = {};
const controllerInstance = {} as any;

const createCrudRouterMock = jest.fn().mockReturnValue('review-router');

jest.mock('@utils/createCrudRouter', () => ({
  createCrudRouter: createCrudRouterMock,
}));

jest.mock('@/repositories', () => ({
  ReviewRepository: jest.fn(() => reviewRepoInstance),
  MediaRepository: jest.fn(() => mediaRepoInstance),
}));

jest.mock('@/services', () => ({
  ReviewService: jest.fn(() => serviceInstance),
}));

jest.mock('@/controllers', () => ({
  ReviewController: jest.fn(() => controllerInstance),
}));

describe('review routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates router using review dependencies', () => {
    jest.isolateModules(() => {
      const module = require('../reviews');

      expect(module.default).toBe('review-router');

      const [[args]] = createCrudRouterMock.mock.calls;
      expect(args.controller).toBe(controllerInstance);

      const { ReviewRepository, MediaRepository } = require('@/repositories');
      const { ReviewService } = require('@/services');
      const { prisma } = require('@config/prisma');

      expect(ReviewRepository).toHaveBeenCalledWith(prisma);
      expect(MediaRepository).toHaveBeenCalledWith(prisma);
      expect(ReviewService).toHaveBeenCalledWith(reviewRepoInstance, mediaRepoInstance);
    });
  });
});
