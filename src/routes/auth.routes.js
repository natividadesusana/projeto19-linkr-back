import { Router } from "express";
import { signUp } from "../controllers/auth.controllers.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signUpSchema } from "../schemas/signUp.schema.js";
import { validateSignup } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), validateSignup, signUp);

export default authRouter;