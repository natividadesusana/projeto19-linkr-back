import { Router } from "express";
import authRouter from "./auth.routes.js";


const router = Router();

router.use(authRouter);

export default router;