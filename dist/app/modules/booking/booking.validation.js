"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const postBooking = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.string().optional(),
        customerID: zod_1.z.string().optional(),
        serviceIDs: zod_1.z
            .array(zod_1.z.object({
            // categoryName: z.string(),
            categoryId: zod_1.z.string(),
            startTime: zod_1.z.string(),
            endTime: zod_1.z.string(),
            apointmentdaysInWeek: zod_1.z
                .enum([...booking_constant_1.apointmentdaysInWeek])
                .optional(),
        }))
            .optional(),
        isConfirm: zod_1.z.boolean().optional(),
    }),
});
const updateBooking = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.string().optional(),
        customerID: zod_1.z.string().optional(),
        serviceIDs: zod_1.z
            .array(zod_1.z.object({
            // categoryName: z.string(),
            categoryId: zod_1.z.string(),
            startTime: zod_1.z.string(),
            endTime: zod_1.z.string(),
            apointmentdaysInWeek: zod_1.z
                .enum([...booking_constant_1.apointmentdaysInWeek])
                .optional(),
        }))
            .optional(),
        isConfirm: zod_1.z.boolean().optional(),
    }),
});
exports.BookingValidation = {
    updateBooking,
    postBooking,
};
