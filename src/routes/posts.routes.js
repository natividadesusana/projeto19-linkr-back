import { Router } from 'express'
import {
  getPosts,
  getPostsHashtags,
  createPosts,
  deletePosts,
  updatePosts,
  postLike,
  postUnlike,
  countNewPosts,
  postRepost,
  getRepost
} from '../controllers/posts.controllers.js'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { postsSchema } from '../schemas/posts.schemas.js'

const postsRouter = Router()

postsRouter.get('/posts', getPosts)
postsRouter.get("/posts/hashtags", getPostsHashtags);
postsRouter.post('/posts', validateSchema(postsSchema), createPosts)
postsRouter.post('/posts/like', postLike)
postsRouter.post('/posts/unlike', postUnlike)
postsRouter.post('/posts/repost/:id', postRepost)
postsRouter.get('/posts/repost', getRepost)
postsRouter.put('/posts/:id', updatePosts)
postsRouter.delete('/posts/:id', deletePosts)
postsRouter.get('/posts/new-posts', countNewPosts)

export default postsRouter
