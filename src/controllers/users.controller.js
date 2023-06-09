import { db } from '../database/database.connection.js'
import { searchUserByInput } from '../services/users.service.js'
import {checkTokenAndReturnUserId} from "../services/session.service.js"

export async function getUsers(req, res) {
  try {
    const { userName } = req.params
    const userId = await checkTokenAndReturnUserId(req)
    const result = await searchUserByInput(userName, userId)
    res.send(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function getUserId(req, res) {
  try {
    const id = req.params.id
    const { rows } = await db.query(
      `
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
      INNER JOIN posts ON posts."userId" = users.id WHERE "userId" = $1`,
      [id]
    )
    res.send(rows)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

