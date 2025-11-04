import { prisma } from '@config/prisma';

const repoInstance = { repo: true };
const serviceInstance = { service: true };
const controllerInstance = { getByType: jest.fn() } as any;

const createCrudRouterMock = jest.fn().mockReturnValue('media-router');

jest.mock('@utils/createCrudRouter', () => ({
  createCrudRouter: createCrudRouterMock,
}));

jest.mock('@/repositories', () => ({
  MediaRepository: jest.fn(() => repoInstance),
}));

jest.mock('@/services', () => ({
  MediaService: jest.fn(() => serviceInstance),
}));

jest.mock('@/controllers', () => ({
  MediaController: jest.fn(() => controllerInstance),
}));

describe('media routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates router with media dependencies and custom routes', () => {
    jest.isolateModules(() => {
      const module = require('../media');

      expect(module.default).toBe('media-router');

      const [[args]] = createCrudRouterMock.mock.calls;
      expect(args.controller).toBe(controllerInstance);

      const routerStub = { get: jest.fn() };
      args.extend?.(routerStub as any);
      expect(routerStub.get).toHaveBeenCalledWith('/type/:type', controllerInstance.getByType);

      const { MediaRepository } = require('@/repositories');
      const { MediaService } = require('@/services');
      expect(MediaRepository).toHaveBeenCalledWith(prisma);
      expect(MediaService).toHaveBeenCalledWith(repoInstance);
    });
  });
});
