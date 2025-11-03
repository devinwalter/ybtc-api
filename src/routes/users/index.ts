import { prisma } from '@config/prisma';

import { UserController } from '@/controllers';
import { UserRepository } from '@/repositories';
import { UserService } from '@/services';
import { createCrudRouter } from '@/utils/createCrudRouter';

const repo = new UserRepository(prisma);
const service = new UserService(repo);
const controller = new UserController(service);

export default createCrudRouter({
  controller,
  extend: (router) => {
    router.post('/', controller.createOrSync);
    router.get('/me', controller.me);
  },
});
