import { db } from '../database/database.connection.js'

export async function searchUserByInput(userName, userId) {
    console.log(userId)
    try {
        const querystring = `
        SELECT "userName"
        FROM users
        WHERE "userName" LIKE $1
        ORDER BY(
                SELECT COUNT(*) FROM followers
                WHERE followers."userId" = $2
                AND followers."followedId" = users.id
            ) DESC
        `;
        const result = await db.query(querystring, [`${userName}%`, userId])
        return result.rows
    }
    catch (err) {
        throw err
    }
}