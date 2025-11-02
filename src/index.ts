import dotenv from 'dotenv';

import { prisma } from '@config/prisma';

import app from './app';

dotenv.config();

const PORT = process.env.PORT || 4040;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Connected to database...');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server...', err);
    process.exit(1);
  }
}

startServer();
