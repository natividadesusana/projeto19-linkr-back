import { db } from "../database/database.connection.js";

export function getPostsDB() {
  return db.query(`SELECT * FROM posts`);
}

export function createPostsDB(url, description, userId) {
  return db.query(`INSERT INTO posts (url, description, "userId") VALUES ($1, $2, $3)`, [url, description, userId]);
}

export function updatePostDB(id, url, description) {
  return db.query(`UPDATE posts SET url = $1, description = $2 WHERE id = $3`, [url, description, id]);
}
  

export function deletePostsDB(id) {
  return db.query(`DELETE FROM posts WHERE id = $1`, [id]);
}

