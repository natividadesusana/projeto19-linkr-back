import axios from "axios";
import { db } from "../database/database.connection.js";

export async function getLikedPost(userId, postId) {
  return db.query('SELECT * FROM posts WHERE "userId" = $1 AND id = $2;', [
    userId,
    postId,
  ]);
}
export async function updateUnliked(postId, increment) {
  return db.query(
    'UPDATE posts SET "likeCount" = "likeCount" - $1 WHERE id = $2;',
    [increment, postId]
  );
}
export async function updateLiked(postId, increment) {
  return db.query(
    'UPDATE posts SET "likeCount" = "likeCount" + $1 WHERE id = $2;',
    [increment, postId]
  );
}
export async function getPostsDB(limit, offset) {
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
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  const result = await db.query(querystring);
  const list = result.rows;

  const metadataPromises = list.map(async (obj) => {
    try {
      const link = obj.post.url
      await axios
        .get(`https://jsonlink.io/api/extract?url=${link}`)
        .then(res => {

          const { title, description, images } = res.data
          obj.post.urlTitle = title || ''
          obj.post.urlDescr = description || ''
          obj.post.urlImg = images[0] || ''
        })
    } catch (error) {
      return
    }
    return obj.post;
  });

  await Promise.all(metadataPromises);

  return list.map((post) => {
    return post.post;
  });
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
  );

  return result.rows[0];
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
export function getPostsHashtagsDB() {
  return db.query(
    `SELECT description as hashtags FROM posts WHERE description LIKE '%#%'`
  );
}
export function countRecentPosts(lastUpdate) {
  return db.query(
    `
    SELECT COUNT(*) AS "countPosts"
    FROM posts 
    WHERE "createdAt" >= $1
    `,
    [lastUpdate]
  );
}
export async function postRepostDB(postId, userId) {
  const result = await db.query(
    `INSERT INTO shares ("postId", "userId") VALUES ($1, $2) RETURNING *`,
    [postId, userId]
  );

  return result.rows[0];
}
export async function getRepostDB() {
  return db.query(
    'SELECT "postId", COUNT(*) AS reposts FROM shares GROUP BY "postId"'
  );
}
