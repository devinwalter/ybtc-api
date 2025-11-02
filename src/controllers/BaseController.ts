import { Request, Response } from 'express';

import { BaseService } from '@services/BaseService';

export abstract class BaseController<TModel> {
  protected service: BaseService<TModel>;

  constructor(service: BaseService<TModel>) {
    this.service = service;
  }

  list = async (_req: Request, res: Response) => {
    const items = await this.service.list();
    res.json(items);
  };

  get = async (req: Request, res: Response) => {
    const item = await this.service.get(req.params.id);
    res.json(item);
  };

  create = async (req: Request, res: Response) => {
    const item = await this.service.create(req.body);
    res.status(201).json(item);
  };

  update = async (req: Request, res: Response) => {
    const item = await this.service.update(req.params.id, req.body);
    res.json(item);
  };

  delete = async (req: Request, res: Response) => {
    const item = await this.service.delete(req.params.id);
    res.json(item);
  };
}
