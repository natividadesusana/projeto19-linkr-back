import { getPostsByHashtagDB } from "../repositories/hashtags.repositories.js";

export async function getPostsByHashtag(req, res) {
  try {
    const { hashtag } = req.params;
    const posts = await getPostsByHashtagDB(hashtag);
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
