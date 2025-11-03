import { Router } from 'express';

import { attachUser, requireAuth } from '@/middleware';

import mediaRouter from './media';
import userRouter from './users';

const router = Router();
router.use('/media', requireAuth, attachUser, mediaRouter);
router.use('/users', requireAuth, attachUser, userRouter);

export default router;
