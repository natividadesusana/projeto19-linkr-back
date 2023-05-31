import { Router } from "express";
import { logout } from "../controllers/auth.controllers.js";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/signUp.schema.js";
import { validateSignup } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/logout", logout);
authRouter.post("/sign-up", validateSchema(signUpSchema), validateSignup, signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), signIn);

export default authRouter;