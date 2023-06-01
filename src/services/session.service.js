import { db } from "../database/database.connection.js";

export async function updateTokenOnDB(token, userId) {
    const querystring = `UPDATE sessions SET token = $1 WHERE "userId" = $2;`;
    const res = await db.query(querystring, [token, userId]);

    return res;
}

export async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { userId, name } = decoded;
        return { userId, name };
    } catch (error) {
        return null;
    }
}

export async function checkToken(req) {
    const { authorization } = req.headers
    console.log('authorization:', authorization)
    if (!authorization) return null
    const token = authorization.replace("Bearer ", "")
    console.log('token:', token)
    const databaseToken = await db.query('SELECT id FROM sessions WHERE token = $1', [token]);
    console.log('databaseToken:', databaseToken.rows)

    if (databaseToken.rows.length === 0) return null;
    const id = databaseToken.rows[0].id;
    return id;
}