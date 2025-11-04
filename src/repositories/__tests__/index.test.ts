import * as repositories from '../index';

describe('repositories index', () => {
  it('re-exports repository classes', () => {
    expect(repositories.MediaRepository).toBeDefined();
    expect(repositories.UserRepository).toBeDefined();
    expect(repositories.ReviewRepository).toBeDefined();
  });
});
