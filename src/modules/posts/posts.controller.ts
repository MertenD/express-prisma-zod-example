import {Router} from "express";
import {createPostSchema} from "./posts.schema";
import * as postService from "./posts.service";
import {validateBody} from "../../middleware/validateRequest";
import {toPostDto, toPostDtoList} from "./posts.dto";

const postsRouter = Router()

postsRouter.get("/", async (req, res) => {
    const posts = await postService.getPosts();
    res.json(toPostDtoList(posts));
})

postsRouter.post(
    "/",
    validateBody(createPostSchema),
    async (req, res) => {
        const body = req.body;
        const newPost = await postService.createPost(body);
        res.status(201).json(toPostDto(newPost));
    }
)

export default postsRouter
