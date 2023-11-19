'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require('zod');
const postService = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string().optional(),
    price: zod_1.z.string().optional(),
    details: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    startTime: zod_1.z.string().optional(),
    endTime: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    apointmentdaysInWeek: zod_1.z.string().optional(),
  }),
});
const updateService = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string().optional(),
    role: zod_1.z.string().optional(),
    price: zod_1.z.string().optional(),
    details: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    startTime: zod_1.z.string().optional(),
    endTime: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    apointmentdaysInWeek: zod_1.z.string().optional(),
  }),
});
exports.ServiceValidation = {
  updateService,
  postService,
};
