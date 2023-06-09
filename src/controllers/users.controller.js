// import { getUserName } from '../repositories/users.repositories.js'

import { db } from '../database/database.connection.js'
import { deleteFollower, getUserFollows, postNewFollowed } from '../repositories/users.repositories.js'

import { checkTokenAndReturnUserId } from '../services/session.service.js'

export async function getUsers(req, res) {
  try {
    const { userName } = req.params
    const userID = await checkTokenAndReturnUserId(req)
    const { rows } = await db.query(
      `SELECT * FROM users WHERE "userName"::text LIKE $1`,
      [`${userName}%`]
    )
    res.send(rows)
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

export async function getFollowers(req, res) {

  const { id, userId } = req.params
  try {
    const result = await getUserFollows(userId, id)

    if (result.rowCount > 0) {
      res.status(200).send(true)
    } else {
      res.status(200).send(false)
    }

  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function postFollow(req, res) {

  const { userId, id } = req.body
  try {
    await postNewFollowed(userId, id)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function unfollow(req, res) {
  const { id, userId } = req.params
  try {
    await deleteFollower(userId, id)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).send(error.message)
  }
}