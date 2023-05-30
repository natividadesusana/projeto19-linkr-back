import { signUpRegister } from "../repositories/auth.repositories.js";

export async function signUp(req, res) {

    try {

        await signUpRegister(req.body);
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }

}