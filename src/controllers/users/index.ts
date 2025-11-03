import { User } from '@prisma/client';
import { Request, Response } from 'express';

import { UserService } from '@/services';

import { BaseController } from '../BaseController';

export class UserController extends BaseController<User> {
  constructor(private userService: UserService) {
    super(userService);
  }

  createOrSync = async (req: Request, res: Response) => {
    const user = await this.userService.getOrCreateUserFromAuth(req.body);
    res.status(201).json(user);
  };

  me = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json(user);
  };
}
