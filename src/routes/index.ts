import { Router } from 'express';

import { requireAuth } from '@/middleware';

import mediaRouter from './media';

const router = Router();
router.use('/media', requireAuth, mediaRouter);

export default router;
