import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
    images: [],
    description: String,
    link: String,
});

export const PostsCollection = mongoose.model('Posts', postsSchema);
