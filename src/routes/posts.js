import express from "express";
import {creationPostController, getAllPostsController} from "../controllers/posts.js";

const router = express.Router();

router.get('/', getAllPostsController);
router.post('/', creationPostController);

export default router;
