import { z } from 'zod';
const postReview = z.object({
  body: z.object({
    customerId: z.string().optional(),

    serviceId: z.string().optional(),

    rating: z.string().optional(),

    comment: z.string().optional(),
  }),
});
const updateReview = z.object({
  body: z.object({
    customerId: z.string().optional(),

    serviceId: z.string().optional(),

    rating: z.string().optional(),

    comment: z.string().optional(),
  }),
});

export const ReviewValidation = {
  updateReview,
  postReview,
};
