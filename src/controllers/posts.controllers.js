import { createPostsDB, getPostsDB } from "../repositories/posts.repositories.js";

export async function getPosts(req, res) {
  try {
    const posts = await getPostsDB();
    res.status(200).send(posts.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createPosts(req, res) {
    const { url, description } = req.body;
    try {
      await createPostsDB(url, description);
      res.sendStatus(201);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  

  

