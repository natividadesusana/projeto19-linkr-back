import { Router } from "express";
import { getPosts, createPosts } from "../controllers/posts.controllers.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { postsSchema } from "../schemas/posts.schemas.js"

const postsRouter = Router();

postsRouter.post("/posts", validateSchema(postsSchema), createPosts);
postsRouter.get("/posts", getPosts);

export default postsRouter;