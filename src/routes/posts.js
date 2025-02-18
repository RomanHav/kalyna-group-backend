import express from "express";

import {creationPostController, getAllPostsController, patchPost, postDelete} from "../controllers/posts.js";

import upload from '../middleware/upload.js'
const router = express.Router();

router.get('/', getAllPostsController);

router.post("/", upload.array("images", 5), creationPostController);

router.delete('/:postId', postDelete);
router.patch('/:postId', patchPost);

export default router;
