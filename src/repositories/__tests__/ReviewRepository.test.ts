import { ReviewRepository } from '../reviews';

describe('ReviewRepository', () => {
  it('can be instantiated with a prisma client', () => {
    const model = {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const prisma = { review: model } as any;

    expect(() => new ReviewRepository(prisma)).not.toThrow();
  });
});
