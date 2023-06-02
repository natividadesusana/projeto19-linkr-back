import { db } from "../database/database.connection.js";

export function getPostsDB() {
  return db.query(`SELECT * FROM posts`);
}

export function createPostsDB(url, description) {
  return db.query(`INSERT INTO posts (url, description) VALUES ($1, $2)`, [url, description]);
}

export function updatePostDB(id, url, description) {
  return db.query(`UPDATE posts SET url = $1, description = $2 WHERE id = $3`, [url, description, id]);
}
  

export function deletePostsDB(id) {
  return db.query(`DELETE FROM posts WHERE id = $1`, [id]);
}

