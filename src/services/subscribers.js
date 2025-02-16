import {SubscribersCollection} from '../db/models/subscribers.js'

export const getAllSubscribers = async () => {
    try {
        return await SubscribersCollection.find();
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        throw error;
    }
};

export const getSubscribersByID = async (subscriberId) => {
    try {
        const subscriber = await SubscribersCollection.findById(subscriberId);
        if (!subscriber) {
            throw new Error('Subscriber not found');
        }
        return subscriber;
    } catch (error) {
        console.error('Error fetching subscriber by ID:', error);
        throw error;
    }
};

export const createSubscriber = async (payload) => {
    try {
        return await SubscribersCollection.create(payload);
    } catch (error) {
        console.error('Error creating subscriber:', error);
        throw error;
    }
};