import { db } from "../database/database.connection.js";

export async function getPostsDB() {
  const querystring = `
    SELECT JSONB_AGG(JSONB_BUILD_OBJECT(
      'userName', users."userName",
      'img', users."pictureUrl",
      'description', posts.description, 
      'url', posts.url,
      'likes', posts."likeCount",
      'trendId', posts."trendId")) AS result
    FROM users
    INNER JOIN posts ON posts."userId" = users.id
  `;
  return await db.query(querystring);
}

export function createPostsDB(url, description, userId) {
  return db.query(`INSERT INTO posts (url, description, "userId") VALUES ($1, $2, $3)`, [url, description, userId]);
}


