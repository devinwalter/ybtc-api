import { Router } from 'express';

import { attachUser, requireAuth } from '@/middleware';

import mediaRouter from './media';
import reviewRouter from './reviews';
import userRouter from './users';

const router = Router();
router.use('/media', requireAuth, attachUser, mediaRouter);
router.use('/users', requireAuth, attachUser, userRouter);
router.use('/reviews', requireAuth, attachUser, reviewRouter);

export default router;
