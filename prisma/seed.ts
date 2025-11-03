import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const authId = 'kCDiWURYRTvtzAJgvSwbFJV3RJN6e1BS@clients';
  const email = 'devin.m.walter4@gmail.com';
  const name = 'Devin Walter';

  const existing = await prisma.user.findUnique({ where: { authId } });
  let user;
  if (!existing) {
    user = await prisma.user.create({
      data: {
        authId,
        email,
        name,
        favoriteType: 'BOOK',
      },
    });

    console.log('Seeded Auth0 User');
  } else {
    user = existing;
    console.log('User already exists');
  }

  const jane = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      authId: 'auth0|jane',
      name: 'Jane Doe',
      email: 'jane@example.com',
      favoriteType: 'BOOK',
    },
  });

  // --- MEDIA ---
  const media1 = await prisma.media.create({
    data: {
      title: 'The Great Gatsby',
      type: 'BOOK',
      metadata: {
        author: 'F. Scott Fitzgerald',
        year: '1925',
        coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
      },
    },
  });

  const media2 = await prisma.media.create({
    data: {
      title: '1984',
      type: 'BOOK',
      metadata: {
        author: 'George Orwell',
        year: '1949',
        coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
      },
    },
  });

  const media3 = await prisma.media.create({
    data: {
      title: 'To Kill a Mockingbird',
      type: 'BOOK',
      metadata: {
        author: 'Harper Lee',
        year: '1960',
        coverUrl: 'https://covers.openlibrary.org/b/id/8306661-M.jpg',
      },
    },
  });

  // --- REVIEWS ---
  await prisma.review.createMany({
    data: [
      {
        userId: user.id,
        mediaId: media1.id,
        contentfulId: 'cf_gatsby_1',
        rating: 5,
      },
      {
        userId: jane.id,
        mediaId: media1.id,
        contentfulId: 'cf_gatsby_2',
        rating: 4,
      },
      {
        userId: user.id,
        mediaId: media2.id,
        contentfulId: 'cf_1984_1',
        rating: 5,
      },
      {
        userId: jane.id,
        mediaId: media3.id,
        contentfulId: 'cf_mockingbird_1',
        rating: 4,
      },
    ],
  });

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
