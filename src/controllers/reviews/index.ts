import { Review } from '@prisma/client';
import { Request, Response } from 'express';

import { ReviewService } from '@/services';

import { BaseController } from '../BaseController';

export class ReviewController extends BaseController<Review> {
  constructor(reviewService: ReviewService) {
    super(reviewService);
  }

  override create = async (req: Request, res: Response) => {
    const user = req.user!;
    const review = await (this.service as ReviewService).createReview(user.id, req.body);

    res.status(201).json(review);
  };
}
