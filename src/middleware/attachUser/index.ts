import { NextFunction, Request, Response } from 'express';

import { prisma } from '@config/prisma';

export async function attachUser(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = req.auth;

    if (!auth?.payload.sub) {
      return res.status(401).json({ message: 'No auth sub found' });
    }

    let user = await prisma.user.findUnique({ where: { authId: auth.payload.sub } });

    if (!user) {
      // TODO: create?
    }

    if (user) {
      req.user = user;
    } else {
      return res.status(404).json({ message: 'User not found' });
    }

    next();
  } catch (err) {
    console.error('Error attaching user', err);
    res.status(500).json({ message: 'Error attaching user.' });
  }
}
