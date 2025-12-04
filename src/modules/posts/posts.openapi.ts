import {registry} from "../../openapi/registry";
import {createPostSchema, postResponseSchema} from "./posts.schema";
import {z} from "zod";

// GET /api/posts
registry.registerPath({
    method: "get",
    path: "/api/posts",
    summary: "Get all posts",
    responses: {
        200: {
            description: "List of all posts",
            content: {
                "application/json": {
                    schema: z.array(postResponseSchema)
                }
            }
        }
    }
})

// POST /api/posts
registry.registerPath({
    method: "post",
    path: "/api/posts",
    summary: "Add a post to the database",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: createPostSchema
                }
            }
        }
    },
    responses: {
        201: {
            description: "The newly created post",
            content: {
                "application/json": {
                    schema: postResponseSchema
                }
            }
        },
        400: {
            description: "Validation error"
        }
    }
})