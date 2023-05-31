import { db } from "../database/database.connection.js";

export async function findUserByEmail(req){
    const reqEmail = req.body.email

    const queryString = "SELECT * FROM users WHERE email = $1"
    const user = await db.query(queryString,[reqEmail])
    if(user.rowCount === 0) return null

    return user.rows[0]
}
