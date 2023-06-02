import { db } from "../database/database.connection.js";

export function getPostsDB() {
  return db.query(`SELECT * FROM posts`);
}

export function createPostsDB(url, description, userId, trendId, likeCount) {
  return db.query(
    `INSERT INTO posts (url, description, "userId", "trendId", "likeCount") VALUES ($1, $2, $3, $4, $5)`,
    [url, description, userId, trendId, likeCount]
  );
}

export function updatePostDB(id, url, description, userId) {
  return db.query(
    `UPDATE posts SET url = $1, description = $2 WHERE id = $3 AND "userId" = $4`,
    [url, description, id, userId]
  );
}

export function deletePostsDB(id, userId) {
  return db.query(`DELETE FROM posts WHERE id = $1 AND "userId" = $2`, [
    id,
    userId,
  ]);
}
