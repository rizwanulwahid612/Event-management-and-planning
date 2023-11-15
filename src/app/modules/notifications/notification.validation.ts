import { z } from 'zod';
const postNotification = z.object({
  body: z.object({
    customerId: z.string().optional(),

    adminId: z.string().optional(),

    booking: z.string().optional(),
  }),
});
const updateNotification = z.object({
  body: z.object({
    customerId: z.string().optional(),

    adminId: z.string().optional(),

    booking: z.string().optional(),
  }),
});

export const NotificationValidation = {
  updateNotification,
  postNotification,
};
