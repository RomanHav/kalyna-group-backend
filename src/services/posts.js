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
