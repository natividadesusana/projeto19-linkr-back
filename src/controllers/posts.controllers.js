import { checkTokenAndReturnUserId } from "../services/session.service.js";
import {
  createPostsDB,
  getPostsDB,
  deletePostsDB,
  updatePostDB,
} from "../repositories/posts.repositories.js";

export async function getPosts(req, res) {
  try {
    const posts = await getPostsDB();
    res.status(200).send(posts.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createPosts(req, res) {
  try {
    const { url, description } = req.body;
    const userId = await checkTokenAndReturnUserId(req);

    await createPostsDB(url, description, userId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updatePosts(req, res) {
  const { id } = req.params;
  const { url, description } = req.body;
  try {
    await updatePostDB(id, url, description);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deletePosts(req, res) {
  const { id } = req.params;
  try {
    await deletePostsDB(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
