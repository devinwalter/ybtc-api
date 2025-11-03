import { Router } from 'express';

import { BaseController } from '@/controllers/BaseController';

type CrudRouterOptions<TModel> = {
  controller: BaseController<TModel>;
  extend?: (router: Router) => void;
};

export const createCrudRouter = <TModel>({ controller, extend }: CrudRouterOptions<TModel>) => {
  const router = Router();

  router.get('/', controller.list);
  router.get('/:id', controller.get);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  if (extend) {
    extend(router);
  }

  return router;
};
