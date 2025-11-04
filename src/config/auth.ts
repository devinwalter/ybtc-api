import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseUrl: `https://${process.env.AUTH_DOMAIN}/`,
};
