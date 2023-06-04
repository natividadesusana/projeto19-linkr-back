import { checkTokenAndReturnUserId } from '../services/session.service.js'
import {
  createPostsDB,
  getPostsDB,
  deletePostsDB,
  updatePostDB
} from '../repositories/posts.repositories.js'

export async function getPosts(req, res) {
  try {
    const posts = await getPostsDB()
    res.status(200).send(posts)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function createPosts(req, res) {
  try {
    const { url, description, trendId } = req.body
    let { likeCount } = req.body
    if (!likeCount) likeCount = 0
    const userId = await checkTokenAndReturnUserId(req)
    console.log(req.body, userId)

    await createPostsDB(url, description, userId, trendId, likeCount)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function updatePosts(req, res) {
  const { id } = req.params
  const { url, description } = req.body
  try {
    const userId = await checkTokenAndReturnUserId(req)
    await updatePostDB(id, url, description, userId)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function deletePosts(req, res) {
  const { id } = req.params
  try {
    const userId = await checkTokenAndReturnUserId(req)
    await deletePostsDB(id, userId)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).send(error.message)
  }
}
