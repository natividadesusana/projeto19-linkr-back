import { db } from "../database/database.connection.js";

export async function updateTokenOnDB(token, userId) {
    const query = `SELECT token FROM sessions WHERE "userId" = $1;`;
    const result = await db.query(query, [userId]);
    const existingToken = result.rows[0]?.token;

    if (existingToken) {
        const updateQuery = `UPDATE sessions SET token = $1 WHERE "userId" = $2;`;
        await db.query(updateQuery, [token, userId]);
        console.log('Token atualizado com sucesso!');
    } else {
        const insertQuery = `INSERT INTO sessions (token, "userId") VALUES ($1, $2);`;
        await db.query(insertQuery, [token, userId]);
        console.log('Token criado com sucesso!');
    }

}


export async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded
    } catch (error) {
        return null;
    }
}

export async function checkTokenAndReturnUserId(req) {
    try {
        const { authorization } = req.headers
        const token = authorization?.replace("Bearer ", "")
        const databaseToken = await db.query("SELECT * FROM sessions WHERE token = $1", [token]);
        const { userId } = databaseToken.rows[0];
        return userId ;
    }
    catch (error) {
        return error
    }


}