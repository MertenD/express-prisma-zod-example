import express from "express";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import postsRouter from "./modules/posts/post.controller";

const app = express();

// Body parser
app.use(express.json());

// Routes
app.use("/api/posts", postsRouter);

// 404 & Error-Handler
app.use(notFound);
app.use(errorHandler);

export default app;
