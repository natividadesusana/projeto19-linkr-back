import { Router } from "express";
import { logout } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/logout", logout);

export default authRouter;