import { db } from "../database/database.connection.js";

export async function insertTokenOnDB(token, userId) {
    console.log(token, userId)
    const querystring = `UPDATE sessions SET "token" = $1 WHERE id = $2;`
    const res = await db.query(querystring, [token, userId]);
    return res
}
