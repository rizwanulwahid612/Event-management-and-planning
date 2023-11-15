import { z } from 'zod';
const postPost = z.object({
  body: z.object({
    adminId: z.string().optional(),
    imagepost: z.string().optional(),
    comment: z.string().optional(),
  }),
});
const updatePost = z.object({
  body: z.object({
    adminId: z.string().optional(),
    imagepost: z.string().optional(),
    comment: z.string().optional(),
  }),
});

export const PostValidation = {
  updatePost,
  postPost,
};
