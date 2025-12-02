import express from "express";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import postRouter from "./modules/post/post.controller";

const app = express();

// Body parser
app.use(express.json());

// Routes
app.use("/api/posts", postRouter);

// 404 & Error-Handler
app.use(notFound);
app.use(errorHandler);

export default app;
