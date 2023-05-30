import { signUpRegister } from "../repositories/auth.repositories.js";
import { findUserByEmail } from "../services/auth.service.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { insertTokenOnDB } from "../services/session.service.js";

export async function signUp(req, res) {

    try {
        await signUpRegister(req.body);
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function signIn(req, res) {
    try {
        const { password } = req.body
        const user = await findUserByEmail(req)

        if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).send("credenciais inválidas")

        const token = Jwt.sign({ userId: user.id, name: user.name }, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })

        delete user.createdAt
        delete user.password
        delete user.id

        await insertTokenOnDB(token, user.id)
        
        return res.send({ user, token })
    } catch (err) {
        res.status(500).send(err.message);
    }

}