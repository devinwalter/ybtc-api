const prismaMock = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  media: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  review: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn(() => prismaMock),
    MediaType: {
      BOOK: 'BOOK',
      SHOW: 'SHOW',
      MOVIE: 'MOVIE',
      SONG: 'SONG',
    },
  };
});

const authMock = jest.fn().mockReturnValue((req: any, res: any, next: any) => next());

jest.mock('express-oauth2-jwt-bearer', () => ({
  auth: authMock,
}));

export const prisma = prismaMock;
