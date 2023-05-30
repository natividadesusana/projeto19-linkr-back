import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export function signUpRegister(body) {

    const { email, password, username, picture_url } = body;

    const hash = bcrypt.hashSync(password, 10);

    const result = db.query(
        `
        INSERT INTO users (email, password, username, picture_url) VALUES ($1, $2, $3, $4);
        `,
        [email, hash, username, picture_url]
    );

    return result;
}

export function existingUser(email) {

    const result = db.query(
        `
        SELECT * FROM users WHERE email = $1;
        `,
        [email]
    );

    return result;
}