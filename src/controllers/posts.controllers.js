import { createPostsDB, getPostsDB } from "../repositories/posts.repositories.js";
import { checkTokenAndReturnUserId } from "../services/session.service.js";

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
    const userId = await checkTokenAndReturnUserId(req)

    await createPostsDB(url, description, userId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}