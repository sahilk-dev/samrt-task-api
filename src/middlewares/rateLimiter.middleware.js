import { redisClient } from "../config/redis.js";
import asyncHandler from "../utils/asyncHandler.js";

const WINDOW_SECONDS = 60 * 15;
const MAX_REQUESTS = 100;

const rateLimiter = asyncHandler(async (req, res, next) => {
    const userId = req.user?.userId || req.ip;
    const key = `rate:${userId}`;

    const current = await redisClient.incr(key);

    if (current === 1) {
        await redisClient.expire(key, WINDOW_SECONDS);
    }

    if (current > MAX_REQUESTS) {
        return res.status(429).json({
            success: false,
            message: "Too many requests, please try again later.",
        });
    }

    next();
});

export default rateLimiter;