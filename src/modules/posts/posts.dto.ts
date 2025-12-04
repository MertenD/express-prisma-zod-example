import {Post} from "../../generated/prisma/client";
import {z} from "zod";
import {createPostSchema, postResponseSchema} from "./posts.schema";

export type PostDto = z.infer<typeof postResponseSchema>
export type CreatePostDto = z.infer<typeof createPostSchema>

export function toPostDto(post: Post): PostDto {
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt.toISOString()
    }
}

export function toPostDtoList(posts: Post[]): PostDto[] {
    return posts.map(toPostDto)
}