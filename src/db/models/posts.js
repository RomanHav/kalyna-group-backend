import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
    images: [],
    description: String,
});

export const PostsCollection = mongoose.model('Posts', postsSchema);
