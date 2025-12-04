import app from "../../app"
import request from "supertest"
import { describe, it, expect, vi, beforeEach } from "vitest"

// Mock Prisma module before it is imported
vi.mock("../../db/prisma", () => {
    return {
        default: {
            post: {
                findMany: vi.fn(),
                create: vi.fn()
            }
        }
    }
})

import prisma from "../../db/prisma"
import {Post} from "../../generated/prisma/browser";
import {PostDto, toPostDto, toPostDtoList} from "./posts.dto";

describe("Posts routes", () => {
    const prismaMock = prisma as unknown as {
        post: {
            findMany: ReturnType<typeof vi.fn>
            create: ReturnType<typeof vi.fn>
        }
    }

    beforeEach(() => {
        prismaMock.post.findMany.mockReset()
        prismaMock.post.create.mockReset()
    })

    it("GET /api/posts should return posts from the database", async () => {
        const mockPosts: Post[] = [
            {
                id: 1,
                title: "Test Post",
                content: "Hello World!",
                createdAt: new Date()
            }
        ]

        prismaMock.post.findMany.mockResolvedValue(mockPosts)

        const res = await request(app).get("/api/posts")

        expect(res.status).toBe(200)

        const expected: PostDto[] = toPostDtoList(mockPosts)

        expect(res.body).toEqual(expected)
        expect(prismaMock.post.findMany).toHaveBeenCalledTimes(1)
    })

    it("POST /api/posts should create a new post", async () => {
        const input = { title: "New Post", content: "Content" }
        const created = {
            id: 1,
            ...input,
            createdAt: new Date()
        }

        prismaMock.post.create.mockResolvedValue(created)

        const res = await request(app).post("/api/posts").send(input).set("Content-Type", "application/json")

        expect(res.status).toBe(201)

        const expected: PostDto = toPostDto(created)

        expect(res.body).toEqual(expected)
        expect(prismaMock.post.create).toBeCalledWith({
            data: {
                title: input.title,
                content: input.content
            }
        })
    })

    it("POST /api/posts validates with zod", async () => {
        const res = await request(app).post("/api/posts").send({ title: "X" })

        expect(res.status).toBe(400)
        expect(prismaMock.post.create).not.toHaveBeenCalled()
    })
})