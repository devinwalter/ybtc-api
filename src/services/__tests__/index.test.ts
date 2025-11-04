import * as services from '../index';

describe('services index', () => {
  it('re-exports service classes', () => {
    expect(services.MediaService).toBeDefined();
    expect(services.UserService).toBeDefined();
    expect(services.ReviewService).toBeDefined();
  });
});
