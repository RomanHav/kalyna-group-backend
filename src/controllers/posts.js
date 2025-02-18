import createHttpError from 'http-errors';
import {createPost, deletePost, getAllPosts, updatePost} from "../services/posts.js";

export const getAllPostsController = async (req, res, next) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json({
            status: 200,
            message: 'Successfully found post!',
            data: posts,
        });
    } catch (error) {
        next(error);
    }
};

export const creationPostController = async (req, res, next) => {
    try {
        const { description } = req.body;

        if (!req.files || req.files.length === 0 || !description) {
            return next(createHttpError(400, "Images and description are required"));
        }

        const imageUrls = req.files.map(file => `https://kalynagroupserver.online/images/${file.filename}`);

        const newPost = {
            images: imageUrls,
            description,
        };

        const postedPost = await createPost(newPost);

        res.status(201).json({
            status: 201,
            message: "Successfully created a post",
            data: postedPost,
        });
    } catch (error) {
        next(error);
    }
};

export const postDelete = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const deletedPost = await deletePost(postId);

        res.status(200).json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        next(createHttpError(400, error.message));
    }
};

export const patchPost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { images, description } = req.body;

        const changingPost = {};
        if (images) changingPost.images = images;
        if (description) changingPost.description = description;

        if (Object.keys(changingPost).length === 0) {
            return next(createHttpError(400, 'No fields to update'));
        }

        const postChange = await updatePost(postId, changingPost);

        if (!postChange) {
            return next(createHttpError(404, 'Post not found'));
        }

        res.status(200).json({
            status: 200,
            message: 'Successfully patched a post!',
            data: postChange.post,
        });
    } catch (error) {
        next(createHttpError(500, error.message));
    }
};