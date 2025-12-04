import prisma from "../../db/prisma";
import {CreatePostDto} from "./posts.dto";

export async function getPosts() {
    return prisma.post.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function createPost(data: CreatePostDto) {
    return prisma.post.create({
        data: {
            title: data.title,
            content: data.content ?? null,
        },
    });
}
