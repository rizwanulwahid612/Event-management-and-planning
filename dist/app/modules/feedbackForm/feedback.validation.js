"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const postFeedback = zod_1.z.object({
    body: zod_1.z.object({
        customerId: zod_1.z.string().optional(),
        comment: zod_1.z.string().optional(),
    }),
});
const updateFeedback = zod_1.z.object({
    body: zod_1.z.object({
        customerId: zod_1.z.string().optional(),
        comment: zod_1.z.string().optional(),
    }),
});
exports.FeedbackValidation = {
    updateFeedback,
    postFeedback,
};
