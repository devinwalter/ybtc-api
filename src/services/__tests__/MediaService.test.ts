import { MediaService } from '../media';

describe('MediaService', () => {
  it('delegates listByType to the repository', async () => {
    const repository = {
      findByType: jest.fn().mockResolvedValue(['media']),
    };

    const service = new MediaService(repository as any);

    await expect(service.listByType('BOOK')).resolves.toEqual(['media']);
    expect(repository.findByType).toHaveBeenCalledWith('BOOK');
  });
});
