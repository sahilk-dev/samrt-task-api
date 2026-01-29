import Task from "../models/Task.model.js"
import { redisClient } from "../config/redis.js"

const getCacheKey = (userId) => `task:user:${userId}`;

export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.userId;

    const task = await Task.create({
        title,
        description,
        userId
    });

    await redisClient.del(getCacheKey(userId));

    res.status(201).json(task);
};

export const getTasks = async (req, res) => {
    const userId = req.user.userId;
    const cacheKey = getCacheKey(userId);

    const cachedTasks = await redisClient.get(cacheKey);

    if (cachedTasks) {
        return res.status(200).json({
            source: "cache",
            data: JSON.parse(cachedTasks),
        });
    }

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    await redisClient.setEx(
        cacheKey,
        300,
        JSON.stringify(tasks)
    );

    res.status(200).json({
        source: "db",
        data: tasks,
    });
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const task = await Task.findOneAndUpdate(
        { _id: id, userId },
        req.body,
        { new: true }
    );

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    await redisClient.del(getCacheKey(userId));

    res.status(200).json(task);
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    await redisClient.del(getCacheKey(userId));

    res.status(200).json({ message: "Task deleted" });
};