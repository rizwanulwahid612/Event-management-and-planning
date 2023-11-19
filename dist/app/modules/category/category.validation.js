"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const postCategory = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        role: zod_1.z.string().optional(),
        serviceID: zod_1.z.string().optional(),
        details: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
const updateCategory = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        serviceID: zod_1.z.string().optional(),
        details: zod_1.z.string().optional(),
    }),
});
exports.CategoryValidation = {
    updateCategory,
    postCategory,
};
