import { prisma } from '@config/prisma';

import { ReviewController } from '@/controllers';
import { MediaRepository, ReviewRepository } from '@/repositories';
import { ReviewService } from '@/services';
import { createCrudRouter } from '@/utils/createCrudRouter';

const mediaRepo = new MediaRepository(prisma);
const reviewRepo = new ReviewRepository(prisma);
const service = new ReviewService(reviewRepo, mediaRepo);
const controller = new ReviewController(service);

export default createCrudRouter({ controller });
