import { db } from '../database/database.connection.js'

export async function getPostsDB() {
  const querystring = `
    SELECT JSONB_BUILD_OBJECT(
      'userName', users."userName",
      'img', users."pictureUrl",
      'id', posts."id",
      'description', posts.description, 
      'url', posts.url,
      'likes', posts."likeCount",
      'trendId', posts."trendId",
      'userId', posts."userId" 
    ) AS post
    FROM users
    INNER JOIN posts ON posts."userId" = users.id
  `
  const result = await db.query(querystring)
  return result.rows.map(row => row.post)
}

export async function createPostsDB(
  url,
  description,
  userId,
  trendId,
  likeCount
) {
  const result = await db.query(
    `INSERT INTO posts (url, description, "userId", "trendId", "likeCount") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [url, description, userId, trendId, likeCount]
  )

  return result.rows[0]
}

export function updatePostDB(id, url, description, userId) {
  return db.query(
    `UPDATE posts SET url = $1, description = $2 WHERE id = $3 AND "userId" = $4`,
    [url, description, id, userId]
  )
}

export function deletePostsDB(id, userId) {
  return db.query(`DELETE FROM posts WHERE id = $1 AND "userId" = $2`, [
    id,
    userId
  ])
}
