// import { getUserName } from '../repositories/users.repositories.js'

import { db } from '../database/database.connection.js'

import { checkTokenAndReturnUserId } from '../services/session.service.js'

export async function getUsers(req, res) {
  try {
    const { userName } = req.params
    const { rows } = await db.query(
      `SELECT * FROM users WHERE "userName"::text LIKE $1`,
      [`${userName}%`]
    )
    res.send(rows)
  } catch (error) {
    res.status(500).send(error.message)
  }
}
