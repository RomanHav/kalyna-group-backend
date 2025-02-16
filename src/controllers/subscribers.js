import createHttpError from 'http-errors';
import {createSubscriber, getAllSubscribers, getSubscribersByID} from "../services/subscribers.js";

export const getAllSubscribersController = async (req, res, next) => {
    try {
        const subscribers = await getAllSubscribers();
        res.status(200).json({
            status: 200,
            message: 'Successfully found subscribers!',
            data: subscribers,
        });
    } catch (error) {
        next(error);
    }
};

export const getSubscribersByIdController = async (req, res, next) => {
    try {
        const { subscriberId } = req.params;
        const subscriber = await getSubscribersByID(subscriberId);

        if (!subscriber) {
            throw createHttpError(404, 'Subscriber not found');
        }

        res.status(200).json({
            status: 200,
            message: `Subscriber was found with id ${subscriberId}!`,
            data: subscriber,
        });
    } catch (error) {
        next(error);
    }
};

export const creationSubscriberController = async (req, res, next) => {
    const { email, location } = req.body;

    if (!email || !location) {
        return next(
            createHttpError(
                400,
                'Email and location are required',
            ),
        );
    }

    const newSubscriber = {
        email,
        location,
    };

    try {
        const postedSubscriber = await createSubscriber(newSubscriber);

        res.status(201).json({
            status: 201,
            message: 'Successfully created a subscriber!',
            data: postedSubscriber,
        });
    } catch (error) {
        next(error);
    }
};
