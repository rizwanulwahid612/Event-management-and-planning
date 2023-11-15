import { z } from 'zod';
const postService = z.object({
  body: z.object({
    name: z.string().optional(),

    price: z.string().optional(),

    details: z.string().optional(),

    location: z.string().optional(),

    startTime: z.string().optional(),

    endTime: z.string().optional(),

    category: z.string().optional(),

    apointmentdaysInWeek: z.string().optional(),
  }),
});
const updateService = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    price: z.string().optional(),

    details: z.string().optional(),

    location: z.string().optional(),

    startTime: z.string().optional(),

    endTime: z.string().optional(),

    category: z.string().optional(),

    apointmentdaysInWeek: z.string().optional(),
  }),
});

export const ServiceValidation = {
  updateService,
  postService,
};
