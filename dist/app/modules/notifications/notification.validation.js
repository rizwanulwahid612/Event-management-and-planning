'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.NotificationValidation = void 0;
const zod_1 = require('zod');
const postNotification = zod_1.z.object({
  body: zod_1.z.object({
    customerId: zod_1.z.string().optional(),
    adminId: zod_1.z.string().optional(),
    booking: zod_1.z.string().optional(),
  }),
});
const updateNotification = zod_1.z.object({
  body: zod_1.z.object({
    customerId: zod_1.z.string().optional(),
    adminId: zod_1.z.string().optional(),
    booking: zod_1.z.string().optional(),
  }),
});
exports.NotificationValidation = {
  updateNotification,
  postNotification,
};
