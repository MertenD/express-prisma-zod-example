import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    content: z.string().max(1000).optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
