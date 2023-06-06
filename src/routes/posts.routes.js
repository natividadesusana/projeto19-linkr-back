import { Router } from 'express'
import {
  getPosts,
  createPosts,
  deletePosts,
  updatePosts,
  postLike,
  postUnlike,
  countNewPosts
} from '../controllers/posts.controllers.js'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { postsSchema } from '../schemas/posts.schemas.js'

const postsRouter = Router()

postsRouter.get('/posts', getPosts)
postsRouter.post('/posts', validateSchema(postsSchema), createPosts)
postsRouter.post('/posts/like', postLike)
postsRouter.post('/posts/unlike', postUnlike)
postsRouter.put('/posts/:id', updatePosts)
postsRouter.delete('/posts/:id', deletePosts)
postsRouter.get('/posts/new-posts', countNewPosts)

export default postsRouter
