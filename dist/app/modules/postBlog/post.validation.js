"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidation = void 0;
const zod_1 = require("zod");
const postPost = zod_1.z.object({
    body: zod_1.z.object({
        adminId: zod_1.z.string().optional(),
        imagepost: zod_1.z.string().optional(),
        comment: zod_1.z.string().optional(),
    }),
});
const updatePost = zod_1.z.object({
    body: zod_1.z.object({
        adminId: zod_1.z.string().optional(),
        imagepost: zod_1.z.string().optional(),
        comment: zod_1.z.string().optional(),
    }),
});
exports.PostValidation = {
    updatePost,
    postPost,
};
