import * as controllers from '../index';

describe('controllers index', () => {
  it('re-exports controller classes', () => {
    expect(controllers.MediaController).toBeDefined();
    expect(controllers.UserController).toBeDefined();
    expect(controllers.ReviewController).toBeDefined();
  });
});
