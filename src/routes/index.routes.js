import { Router } from "express";
import postsRouter from "./posts.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.use(postsRouter);
router.use(authRouter);

export default router;
