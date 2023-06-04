import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { Router } from 'express'
import { getUserName } from '../repositories/users.repositories.js'
import { usersSchema } from '../schemas/users.schemas.js'
import { getUsers } from '../controllers/users.controller.js'

const userRouter = Router()

userRouter.get('/users/:userName', getUsers)

export default userRouter
