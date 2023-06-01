import { db } from "../database/database.connection.js";

export function getPostsDB() {
  return db.query(`SELECT * FROM posts`);
}

export function createPostsDB(url, description, userId) {
  return db.query(`INSERT INTO posts (url, description, "userId") VALUES ($1, $2, $3)`, [url, description, userId]);
}


  