import { Router } from 'express';

import { attachUser, requireAuth } from '@/middleware';

import mediaRouter from './media';

const router = Router();
router.use('/media', requireAuth, attachUser, mediaRouter);

export default router;
