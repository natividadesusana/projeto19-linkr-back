import { db } from "../database/database.connection.js"

export const countPosts = async () => {
    const { rows } = await db.query(`
        SELECT COUNT(*) as post_count
        FROM posts;
    `)
    return Number(rows[0].post_count);
}