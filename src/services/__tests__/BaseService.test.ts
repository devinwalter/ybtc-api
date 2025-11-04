import { BaseService } from '../BaseService';

class TestService extends BaseService<{ id: string }> {
  constructor(repository: any) {
    super(repository);
  }
}

const createRepository = () => ({
  findAll: jest.fn().mockResolvedValue([{ id: '1' }]),
  findById: jest.fn().mockResolvedValue({ id: '1' }),
  create: jest.fn().mockResolvedValue({ id: 'created' }),
  update: jest.fn().mockResolvedValue({ id: 'updated' }),
  delete: jest.fn().mockResolvedValue({ id: 'deleted' }),
});

describe('BaseService', () => {
  it('delegates methods to repository', async () => {
    const repository = createRepository();
    const service = new TestService(repository);

    await expect(service.list()).resolves.toEqual([{ id: '1' }]);
    expect(repository.findAll).toHaveBeenCalled();

    await expect(service.get('1')).resolves.toEqual({ id: '1' });
    expect(repository.findById).toHaveBeenCalledWith('1');

    await expect(service.create({ id: 'c' })).resolves.toEqual({ id: 'created' });
    expect(repository.create).toHaveBeenCalledWith({ id: 'c' });

    await expect(service.update('1', { id: 'u' })).resolves.toEqual({ id: 'updated' });
    expect(repository.update).toHaveBeenCalledWith('1', { id: 'u' });

    await expect(service.delete('1')).resolves.toEqual({ id: 'deleted' });
    expect(repository.delete).toHaveBeenCalledWith('1');
  });
});
