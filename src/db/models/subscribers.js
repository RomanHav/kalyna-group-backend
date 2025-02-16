import mongoose from "mongoose";

const subscribersSchema = new mongoose.Schema({
    email: { type: String, required: true },
    location: String,
})

export const SubscribersCollection = mongoose.model('Subscribers', subscribersSchema);