import {PostsCollection} from "../db/models/posts.js";

export const getAllPosts = async () => {
    try {
        return await PostsCollection.find();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const createPost = async (payload) => {
    try {
        return await PostsCollection.create(payload);
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        const deletedPost = await PostsCollection.findOneAndDelete({ _id: postId });
        if (!deletedPost) {
            throw new Error('Post not found');
        }

        return deletedPost;
    } catch (error) {
        console.error('Error deleting post:', error.message);
        throw new Error(error.message || 'Failed to delete post');
    }
};

export const updatePost = async (postId, payload, options = {}) => {
    try {
        const updateQuery = {
            $set: { description: payload.description, link: payload.link },
        };

        if (payload.removedImages && payload.removedImages.length > 0) {
            updateQuery.$pull = { images: { $in: payload.removedImages } };
        }

        if (payload.images && payload.images.length > 0) {
            updateQuery.$push = { images: { $each: payload.images } };
        }

        const updatedPost = await PostsCollection.findOneAndUpdate(
            { _id: postId },
            updateQuery,
            { new: true, ...options }
        ).lean();


        return updatedPost ? { post: updatedPost } : null;
    } catch (error) {
        console.error('Error updating post:', error.message);
        throw new Error('Failed to update post');
    }
};