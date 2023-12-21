'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require('zod');
const postReview = zod_1.z.object({
  body: zod_1.z.object({
    customerId: zod_1.z.string().optional(),
    serviceId: zod_1.z.string().optional(),
    rating: zod_1.z.string().optional(),
    comment: zod_1.z.string().optional(),
  }),
});
const updateReview = zod_1.z.object({
  body: zod_1.z.object({
    customerId: zod_1.z.string().optional(),
    serviceId: zod_1.z.string().optional(),
    rating: zod_1.z.string().optional(),
    comment: zod_1.z.string().optional(),
  }),
});
exports.ReviewValidation = {
  updateReview,
  postReview,
};
