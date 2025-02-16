import express from "express";
import {
    creationSubscriberController,
    getAllSubscribersController,
    getSubscribersByIdController
} from "../controllers/subscribers.js";

const router = express.Router();
router.get('/', getAllSubscribersController);
router.get('/:subscriberId',getSubscribersByIdController);
router.post('/', creationSubscriberController);

export default router;