import { Router } from "express";
import postsRouter from "./posts.routes.js";

const router = Router();

router.use(postsRouter);

export default router;
