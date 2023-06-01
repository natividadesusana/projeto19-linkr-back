import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export function deleteTokenFromDB(token) {
    return db.query(`DELETE FROM sessions WHERE token = $1;`, [token]);
}

export async function signUpRegister(body) {
    const { email, password, username, pictureUrl } = body;
    const hash = bcrypt.hashSync(password, 10);

    const result = await db.query(
        `
      INSERT INTO users (email, password, "userName", "pictureUrl") VALUES ($1, $2, $3, $4);
      `,
        [email, hash, username, pictureUrl]
    );

    return result;
}

export async function existingUser(email) {
    const result = await db.query(
      `
      SELECT * FROM users WHERE email = $1;
      `,
      [email]
    );
  
    return result;
  }