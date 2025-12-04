import {z} from "zod";

export const postResponseSchema = z.object({
    id: z.number().int(),
    title: z.string().min(3).openapi({ example: "My first post" }),
    content: z.string().nullable().optional().openapi({ example: "Hello World!" }),
    createdAt: z.iso.datetime().openapi({ example: "2025-01-01T12:00:00.000Z" })
}).openapi("Post")

export const createPostSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    content: z.string().max(1000).optional()
}).openapi("CreatePost")
