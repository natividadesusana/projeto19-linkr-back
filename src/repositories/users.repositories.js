import { db } from '../database/database.connection.js'

export async function getUserName(userName) {
  const result = await db.query(
    `
  SELECT * 
  FROM users 
  WHERE "userName"::text LIKE $=1%;`,
    [userName]
  )
  return result.rows
}

export async function getUserFollows(userId, id) {

  return db.query(
    `
    SELECT * FROM followers
    WHERE "userId" = $1 AND "followedId" = $2
    `, [userId, id])
}

export async function postNewFollowed(userId, id) {
  return db.query(
    `
    INSERT INTO followers ("userId", "followedId") VALUES ($1, $2)
    `, [userId, id])
}

export async function deleteFollower(userId, id) {
  return db.query(`DELETE FROM followers WHERE "userId" = $1 AND "followedId" = $2`, [userId, id])
}