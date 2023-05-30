import { existingUser } from "../repositories/auth.repositories.js";

export async function validateSignup(req, res, next) {

    const { email } = req.body;

    const user = await existingUser(email);

    if (user.rowCount > 0) return res.status(409).send("E-mail inserido já foi cadastrado");

    next();
}