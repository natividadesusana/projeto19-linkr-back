import { Router } from "express";
import { getPostsByHashtag } from "../controllers/hashtags.controllers.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtags/:hashtag", getPostsByHashtag);

export default hashtagsRouter;
