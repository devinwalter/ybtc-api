import { auth as authFactory } from 'express-oauth2-jwt-bearer';

describe('requireAuth middleware', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env.AUTH_AUDIENCE = 'aud';
    process.env.AUTH_DOMAIN = 'example.com';
  });

  it('configures auth client with environment values', () => {
    jest.isolateModules(() => {
      const { requireAuth } = require('../auth');

      expect(authFactory).toHaveBeenCalledWith({
        audience: 'aud',
        issuerBaseURL: 'https://example.com/',
      });
      expect(typeof requireAuth).toBe('function');
    });
  });
});
