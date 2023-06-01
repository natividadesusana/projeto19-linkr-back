import { createPostsDB, getPostsDB } from "../repositories/posts.repositories.js";
import { checkToken, verifyToken } from "../services/session.service.js";

export async function getPosts(req, res) {
  try {
    const posts = await getPostsDB();
    res.status(200).send(posts.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createPosts(req, res) {
  const { url, description} = req.body;
  const token = await checkToken(req)

  console.log(token)
  const decodedToken = await verifyToken(token)
  console.log(decodedToken)
  try {
    // await createPostsDB(url, description, userId);
    // res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}