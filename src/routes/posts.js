import express from "express";
import {creationPostController, getAllPostsController} from "../controllers/posts.js";
import upload from '../middleware/upload.js'
const router = express.Router();

router.get('/', getAllPostsController);
router.post("/", upload.array("images", 5), creationPostController);
export default router;
