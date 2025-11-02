import { Media } from '@prisma/client';
import { Request, Response } from 'express';

import { MediaService } from '@/services';

import { BaseController } from '../BaseController';

export class MediaController extends BaseController<Media> {
  constructor(service: MediaService) {
    super(service);
  }

  // example of custom list
  getByType = async (req: Request, res: Response) => {
    const data = await (this.service as MediaService).listByType(req.params.type);
    res.json(data);
  };
}
