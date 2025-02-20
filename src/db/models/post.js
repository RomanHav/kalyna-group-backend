import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    link: { type: String, required: true },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
