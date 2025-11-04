import { BaseRepository } from '../BaseRepository';

class TestRepository extends BaseRepository<{ id: string }> {
  constructor(model: any) {
    super({} as any, model);
  }
}

const createModel = () => ({
  findMany: jest.fn().mockResolvedValue([{ id: '1' }]),
  findUnique: jest.fn().mockResolvedValue({ id: '1' }),
  create: jest.fn().mockResolvedValue({ id: 'created' }),
  update: jest.fn().mockResolvedValue({ id: 'updated' }),
  delete: jest.fn().mockResolvedValue({ id: 'deleted' }),
});

describe('BaseRepository', () => {
  it('delegates CRUD operations to the underlying model', async () => {
    const model = createModel();
    const repo = new TestRepository(model);

    await expect(repo.findAll()).resolves.toEqual([{ id: '1' }]);
    expect(model.findMany).toHaveBeenCalledWith();

    await expect(repo.findById('1')).resolves.toEqual({ id: '1' });
    expect(model.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });

    await expect(repo.create({ id: '3' })).resolves.toEqual({ id: 'created' });
    expect(model.create).toHaveBeenCalledWith({ data: { id: '3' } });

    await expect(repo.update('1', { id: 'updated' })).resolves.toEqual({ id: 'updated' });
    expect(model.update).toHaveBeenCalledWith({ where: { id: '1' }, data: { id: 'updated' } });

    await expect(repo.delete('1')).resolves.toEqual({ id: 'deleted' });
    expect(model.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
