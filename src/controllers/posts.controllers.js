import { createLike, createPostsDB, deleteLike, getLikedPost, getPostsDB, updateLikeCount } from "../repositories/posts.repositories.js";
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

export async function postLike(req, res) {
  const { postId, userId } = req.body;

  try {
    const likedPost = await getLikedPost(userId, postId);

    if (!likedPost) {
      await createLike(userId, postId);
      await updateLikeCount(postId, 1); // Atualiza o likeCount do post incrementando 1
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postUnlike(req, res) {
  const { postId, userId } = req.body;

  try {
    const likedPost = await getLikedPost(userId, postId);

    if (likedPost) {
      await deleteLike(userId, postId);
      await updateLikeCount(postId, -1); // Atualiza o likeCount do post decrementando 1
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}