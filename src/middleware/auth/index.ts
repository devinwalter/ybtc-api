import { auth } from 'express-oauth2-jwt-bearer';

import { authConfig } from '@config/auth';

export const requireAuth = auth({
  audience: authConfig.audience,
  issuerBaseURL: authConfig.issuerBaseUrl,
});
