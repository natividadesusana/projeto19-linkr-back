import { db } from "../database/database.connection.js";

export function getPostsDB() {
  return db.query(`SELECT * FROM posts`);
}

export function createPostsDB(url, description) {
  return db.query(`INSERT INTO posts (url, description) VALUES ($1, $2)`, [url, description]);
}


  