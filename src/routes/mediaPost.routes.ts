import { getMediaPosts } from "../controllers/mediaPostController";

const express = require('express');
export const mediaRouter = express.Router();

mediaRouter.get('/media/posts', getMediaPosts);

