import { z } from 'zod';
import { apointmentdaysInWeek } from './booking.constant';
const postBooking = z.object({
  body: z.object({
    role: z.string().optional(),
    customerID: z.string().optional(),
    serviceIDs: z
      .array(
        z.object({
          // categoryName: z.string(),
          categoryId: z.string(),
          startTime: z.string(),
          endTime: z.string(),
          apointmentdaysInWeek: z
            .enum([...apointmentdaysInWeek] as [string, ...string[]])
            .optional(),
        }),
      )
      .optional(),
    isConfirm: z.boolean().optional(),
  }),
});
const updateBooking = z.object({
  body: z.object({
    role: z.string().optional(),
    customerID: z.string().optional(),
    serviceIDs: z
      .array(
        z.object({
          // categoryName: z.string(),
          categoryId: z.string(),
          startTime: z.string(),
          endTime: z.string(),
          apointmentdaysInWeek: z
            .enum([...apointmentdaysInWeek] as [string, ...string[]])
            .optional(),
        }),
      )
      .optional(),
    isConfirm: z.boolean().optional(),
  }),
});

export const BookingValidation = {
  updateBooking,
  postBooking,
};
