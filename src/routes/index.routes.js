import { Router } from "express";
import postsRouter from "./posts.routes.js";
import authRouter from "./auth.routes.js";
import hashtagsRouter from "./hashtags.routes.js";
import userRouter from './users.routes.js'

const router = Router()

router.use(postsRouter);
router.use(authRouter);
router.use(hashtagsRouter);
router.use(userRouter)

export default router
