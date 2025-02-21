import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
    images: [],
    description: String,
    link: String,
}, { timestamps: true });

export const PostsCollection = mongoose.model('Posts', postsSchema);
