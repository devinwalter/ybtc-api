import dotenv from 'dotenv';

export const authConfig = {
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseUrl: `https://${process.env.AUTH_DOMAIN}/`,
};
