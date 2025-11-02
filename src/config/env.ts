import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.port || 4040,
  env: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
};
