import {Router} from "express";
import {createPostSchema} from "./post.schema";
import * as postService from "./post.service";
import {validateBody} from "../../middleware/validateRequest";

const postsRouter = Router()

postsRouter.get("/", async (req, res) => {
    const posts = await postService.getPosts();
    res.json(posts);
})

postsRouter.post(
    "/",
    validateBody(createPostSchema),
    async (req, res) => {
        const body = req.body;
        const newPost = await postService.createPost(body);
        res.status(201).json(newPost);
    }
)

export default postsRouter
