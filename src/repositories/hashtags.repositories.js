import { db } from '../database/database.connection.js';

export async function getPostsByHashtagDB(hashtag) {
  const query = `
    SELECT 
      posts.*, 
      users."userName", 
      users."pictureUrl" 
    FROM 
      users 
      INNER JOIN posts ON posts."userId" = users.id 
    WHERE 
      LOWER(posts.description) LIKE '%#${hashtag.toLowerCase()}%'
  `;

  const result = await db.query(query);
  return result.rows;
}
