import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const authId = 'kCDiWURYRTvtzAJgvSwbFJV3RJN6e1BS@clients';
  const email = 'devin.m.walter4@gmail.com';
  const name = 'Devin Walter';

  const existing = await prisma.user.findUnique({ where: { authId } });

  if (!existing) {
    await prisma.user.create({
      data: {
        authId,
        email,
        name,
        favoriteType: 'BOOK',
      },
    });

    console.log('Seeded Auth0 User');
  } else {
    console.log('User already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
