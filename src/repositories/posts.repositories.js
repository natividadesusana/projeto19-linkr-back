import { db } from "../database/database.connection.js";

export function getPostsDB() {
  return db.query(`SELECT * FROM posts`);
}

export function createPostsDB(url, description, userId) {
  return db.query(`INSERT INTO posts (url, description, "userId") VALUES ($1, $2, $3)`, [url, description, userId]);
}

export async function getLikedPost(userId, postId) {
  return db.query('SELECT * FROM likes WHERE user_id = $1 AND post_id = $2;', [userId, postId]);
}

export async function createLike(userId, postId) {
  return db.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2);', [userId, postId]);
}

export async function deleteLike(userId, postId) {
  return db.query('DELETE FROM likes WHERE user_id = $1 AND post_id = $2;', [userId, postId]);
}

export async function updateLikeCount(postId, increment) {
  return db.query('UPDATE posts SET likeCount = likeCount + $1 WHERE id = $2;', [increment, postId]);
}

  