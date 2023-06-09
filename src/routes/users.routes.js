import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { Router } from 'express'
import { getUserName } from '../repositories/users.repositories.js'
import { usersSchema } from '../schemas/users.schemas.js'
import { getFollowers, getUserId, getUsers, postFollow, unfollow } from '../controllers/users.controller.js'

const userRouter = Router()

userRouter.get('/users/:userName', getUsers)
userRouter.get('/user/:id', getUserId)
userRouter.get('/users/:id/followers/:userId', getFollowers)
userRouter.post('/users/followers', postFollow)
userRouter.delete('/users/:id/followers/:userId', unfollow)

export default userRouter
