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
