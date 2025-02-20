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
        const { description, link } = req.body;


        if (!req.files || req.files.length === 0 || !description || !link) {
            return next(createHttpError(400, "Images, description and link are required"));
        }


        const imageUrls = req.files.map(file => `https://kalynagroupserver.online/images/${file.filename}`);

        const newPost = {
            images: imageUrls,
            description,
            link,
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



export const patchPostController = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { description, link, removedImages } = req.body;

        // Найти существующий пост
        const existingPost = await PostsCollection.findById(postId);
        if (!existingPost) {
            return next(createHttpError(404, "Post not found"));
        }

        let updatedImages = existingPost.images;

        // Удаление указанных изображений
        if (removedImages && Array.isArray(removedImages)) {
            updatedImages = updatedImages.filter((img) => !removedImages.includes(img));
        }

        // Добавление новых загруженных изображений
        if (req.files && req.files.length > 0) {
            const newImageUrls = req.files.map(file => `https://kalynagroupserver.online/images/${file.filename}`);
            updatedImages = [...updatedImages, ...newImageUrls];
        }

        const changingPost = {};
        if (description) changingPost.description = description;
        if (link) changingPost.link = link;
        changingPost.images = updatedImages;

        // Проверяем, есть ли изменения
        if (Object.keys(changingPost).length === 0) {
            return next(createHttpError(400, "No fields to update"));
        }

        // Обновляем пост
        const updatedPost = await updatePost(postId, changingPost);
        if (!updatedPost) {
            return next(createHttpError(500, "Failed to update post"));
        }

        res.status(200).json({
            status: 200,
            message: "Successfully patched a post!",
            data: updatedPost.post,
        });
    } catch (error) {
        next(createHttpError(500, error.message));
    }
};
