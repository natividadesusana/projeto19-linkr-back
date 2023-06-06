import { Router } from "express";
import { getPosts, getPostsHashtags, createPosts, deletePosts, updatePosts } from "../controllers/posts.controllers.js";
import {validateSchema} from "../middlewares/validateSchema.middleware.js";
import { postsSchema } from "../schemas/posts.schemas.js";

const postsRouter = Router();

postsRouter.get("/posts", getPosts);
postsRouter.get("/posts/hashtags", getPostsHashtags);
postsRouter.post("/posts", validateSchema(postsSchema), createPosts);
postsRouter.put("/posts/:id", updatePosts);
postsRouter.delete("/posts/:id", deletePosts);

export default postsRouter;
