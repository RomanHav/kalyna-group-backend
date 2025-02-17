import createHttpError from 'http-errors';
import {createPost, getAllPosts} from "../services/posts.js";

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
    const { images, description} = req.body;

    if (!images || !description) {
        return next(
            createHttpError(
                400,
                'Images and description are required',
            ),
        );
    }

    const newPost = {
        images,
        description,
    };

    try {
        const postedPost = await createPost(newPost);

        res.status(201).json({
            status: 201,
            message: 'Successfully created a post',
            data: postedPost,
        });
    } catch (error) {
        next(error);
    }
};
