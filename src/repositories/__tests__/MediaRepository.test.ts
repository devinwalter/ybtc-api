import { MediaConnector } from '@/types/media';

import { MediaRepository } from '../media';

const createModel = () => ({
  findMany: jest.fn(),
  findFirst: jest.fn(),
  create: jest.fn(),
});

const createRepository = (modelOverrides: Partial<ReturnType<typeof createModel>> = {}) => {
  const model = { ...createModel(), ...modelOverrides };
  return {
    repo: new MediaRepository({ media: model } as any),
    model,
  };
};

describe('MediaRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('findByType proxies to the model', async () => {
    const { repo, model } = createRepository();
    const result = [{ id: '1' }];
    model.findMany.mockResolvedValue(result);

    await expect(repo.findByType('BOOK')).resolves.toBe(result);
    expect(model.findMany).toHaveBeenCalledWith({ where: { type: 'BOOK' } });
  });

  it('returns existing media when found by external id', async () => {
    const existing = { id: 'media-1' };
    const { repo, model } = createRepository({
      findFirst: jest.fn().mockResolvedValue(existing),
    });

    await expect(
      repo.findOrCreateByExternalId('OPEN_LIBRARY', 'ext-1'),
    ).resolves.toBe(existing);
    expect(model.findFirst).toHaveBeenCalledWith({
      where: {
        externals: { some: { provider: 'OPEN_LIBRARY', externalId: 'ext-1' } },
        include: { externals: true },
      },
    });
    expect(model.create).not.toHaveBeenCalled();
  });

  it('creates media using connector data when not found', async () => {
    const created = { id: 'media-2' };
    const connector: MediaConnector = {
      getById: jest.fn().mockResolvedValue({
        id: 'ext-1',
        title: 'Test Book',
        author: 'Author',
        year: '2024',
        coverUrl: 'cover.jpg',
        provider: 'OPEN_LIBRARY',
        type: 'BOOK' as any,
      }),
      search: jest.fn(),
    };
    const { repo, model } = createRepository({
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(created),
    });

    await expect(
      repo.findOrCreateByExternalId('OPEN_LIBRARY', 'ext-1', connector),
    ).resolves.toBe(created);

    expect(connector.getById).toHaveBeenCalledWith('ext-1');
    expect(model.create).toHaveBeenCalledWith({
      data: {
        title: 'Test Book',
        type: 'BOOK',
        metadata: {
          autor: 'Author',
          year: '2024',
          coverUrl: 'cover.jpg',
        },
        externals: {
          create: { provider: 'OPEN_LIBRARY', externalId: 'ext-1' },
        },
      },
      include: { externals: true },
    });
  });

  it('creates media without connector data when connector returns null', async () => {
    const created = { id: 'media-3' };
    const connector: MediaConnector = {
      getById: jest.fn().mockResolvedValue(null),
      search: jest.fn(),
    };

    const { repo, model } = createRepository({
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(created),
    });

    await expect(
      repo.findOrCreateByExternalId('OPEN_LIBRARY', 'ext-2', connector),
    ).resolves.toBe(created);

    expect(model.create).toHaveBeenCalledWith({
      data: {
        externals: {
          create: { provider: 'OPEN_LIBRARY', externalId: 'ext-2' },
        },
      },
      include: { externals: true },
    });
  });

  it('creates media when no connector is provided', async () => {
    const created = { id: 'media-4' };
    const { repo, model } = createRepository({
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(created),
    });

    await expect(repo.findOrCreateByExternalId('OPEN_LIBRARY', 'ext-3')).resolves.toBe(created);

    expect(model.create).toHaveBeenCalledWith({
      data: {
        externals: {
          create: { provider: 'OPEN_LIBRARY', externalId: 'ext-3' },
        },
      },
      include: { externals: true },
    });
  });
});
