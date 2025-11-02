import { prisma } from '@config/prisma';

import { MediaController } from '@/controllers';
import { MediaRepository } from '@/repositories';
import { MediaService } from '@/services';
import { createCrudRouter } from '@/utils/createCrudRouter';

const repo = new MediaRepository(prisma);
const service = new MediaService(repo);
const controller = new MediaController(service);

export default createCrudRouter({
  controller,
  extend: (router) => {
    router.get('/type/:type', controller.getByType);
  },
});
