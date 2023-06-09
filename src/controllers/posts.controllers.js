import { checkTokenAndReturnUserId } from "../services/session.service.js";
import {
  createPostsDB,
  getPostsDB,
  getPostsHashtagsDB,
  deletePostsDB,
  updatePostDB,
  updateUnliked,
  getLikedPost,
  updateLiked,
  countRecentPosts,
  postRepostDB,
  getRepostDB,
} from "../repositories/posts.repositories.js";
import { countPosts } from "../services/posts.service.js";

export async function postLike(req, res) {
  const { id, userId } = req.body;

  try {
    const { rows } = await getLikedPost(userId, id);
    const like = rows[0].likeCount;

    if (like === 0) {
      await updateLiked(id, 1);
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postUnlike(req, res) {
  const { id, userId } = req.body;

  try {
    const { rows } = await getLikedPost(userId, id);
    const like = rows[0].likeCount;

    if (like > 0) {
      await updateUnliked(id, 1);
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getPosts(req, res) {
  try {
    let { limit, offset } = req.query;

    if (!limit) limit = 5;
    if (!offset) offset = 0;

    const { rows } = await countRecentPosts(); // Corrigir chamada para countRecentPosts()
    
    const total = rows[0].countPosts;
    const currentUrl = req.route.path;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    const posts = await getPostsDB(limit, offset);
    res.status(200).send({
      previousUrl,
      nextUrl,
      limit,
      offset,
      total,

      results: posts.map((post) => ({
        id: post.id,
        img: post.img,
        url: post.url,
        likes: post.likes,
        userId: post.userId,
        trendId: post.trendId,
        userName: post.userName,
        description: post.description,
        urlDescr: post.urlDescr,
        urlImg: post.urlImg,
        urlTitle: post.urlTitle,
      })),      
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createPosts(req, res) {
  try {
    const { url, description, trendId } = req.body;
    let { likeCount } = req.body;
    if (!likeCount) likeCount = 0;
    const userId = await checkTokenAndReturnUserId(req);

    await createPostsDB(url, description, userId, trendId, likeCount);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updatePosts(req, res) {
  const { id } = req.params;
  const { url, description } = req.body;
  try {
    const userId = await checkTokenAndReturnUserId(req);
    await updatePostDB(id, url, description, userId);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deletePosts(req, res) {
  const { id } = req.params;
  try {
    const userId = await checkTokenAndReturnUserId(req);
    await deletePostsDB(id, userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getPostsHashtags(req, res) {
  try {
    const hashtags = await getPostsHashtagsDB();
    const parsedHashtags = hashtags.rows.reduce((acc, item) => {
      const match = item.hashtags.match(/#\S+/g);

      if (match) {
        const filteredHashtags = match.map((tag) => tag.replace("#", ""));
        return [...new Set(acc.concat(filteredHashtags))];
      }
      return acc;
    }, []);
    res.status(200).send(parsedHashtags);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function countNewPosts(req, res) {
  const { lastUpdate } = req.query;
  try {
    const newPosts = await countRecentPosts(lastUpdate);
    res.status(200).send(newPosts.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function postRepost(req, res) {
  const { id } = req.params;

  try {
    const userId = await checkTokenAndReturnUserId(req);
    await postRepostDB(id, userId);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getRepost(req, res) {
  try {
    const repost = await getRepostDB();
    res.status(200).send(repost.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
