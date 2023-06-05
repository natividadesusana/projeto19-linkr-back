import { Router } from "express";
import postsRouter from "./posts.routes.js";
import authRouter from "./auth.routes.js";
import hashtagsRouter from "./hashtags.routes.js";

const router = Router();

router.use(postsRouter);
router.use(authRouter);
router.use(hashtagsRouter);

export default router;
