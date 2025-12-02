import { CreatePostInput } from "./posts.schema";
import {prisma} from "../../db/prisma";

export async function getPosts() {
    return prisma.post.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function createPost(data: CreatePostInput) {
    return prisma.post.create({
        data: {
            title: data.title,
            content: data.content ?? null,
        },
    });
}
