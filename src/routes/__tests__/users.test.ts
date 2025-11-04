import { prisma } from '@config/prisma';

const repoInstance = {};
const serviceInstance = {};
const controllerInstance = {
  createOrSync: jest.fn(),
  me: jest.fn(),
} as any;

const createCrudRouterMock = jest.fn().mockReturnValue('user-router');

jest.mock('@utils/createCrudRouter', () => ({
  createCrudRouter: createCrudRouterMock,
}));

jest.mock('@/repositories', () => ({
  UserRepository: jest.fn(() => repoInstance),
}));

jest.mock('@/services', () => ({
  UserService: jest.fn(() => serviceInstance),
}));

jest.mock('@/controllers', () => ({
  UserController: jest.fn(() => controllerInstance),
}));

describe('user routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('configures CRUD router with user specific endpoints', () => {
    jest.isolateModules(() => {
      const module = require('../users');

      expect(module.default).toBe('user-router');

      const [[args]] = createCrudRouterMock.mock.calls;
      expect(args.controller).toBe(controllerInstance);

      const routerStub = { post: jest.fn(), get: jest.fn() };
      args.extend?.(routerStub as any);
      expect(routerStub.post).toHaveBeenCalledWith('/', controllerInstance.createOrSync);
      expect(routerStub.get).toHaveBeenCalledWith('/me', controllerInstance.me);

      const { UserRepository } = require('@/repositories');
      const { UserService } = require('@/services');
      expect(UserRepository).toHaveBeenCalledWith(prisma);
      expect(UserService).toHaveBeenCalledWith(repoInstance);
    });
  });
});
