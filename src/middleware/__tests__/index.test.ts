import * as middleware from '../index';

describe('middleware index', () => {
  it('re-exports auth helpers', () => {
    expect(middleware.requireAuth).toBeDefined();
    expect(middleware.attachUser).toBeDefined();
  });
});
