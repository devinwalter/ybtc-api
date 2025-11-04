import { ReviewController } from '../reviews';

describe('ReviewController', () => {
  const service = {
    createReview: jest.fn().mockResolvedValue({ id: 'review-1' }),
  };
  const controller = new ReviewController(service as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a review using authenticated user', async () => {
    const req = {
      user: { id: 'user-1' },
      body: { rating: 5 },
    } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.create(req, res);

    expect(service.createReview).toHaveBeenCalledWith('user-1', { rating: 5 });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 'review-1' });
  });
});
