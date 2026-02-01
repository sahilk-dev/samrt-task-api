import express from "express";
import validate from "../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validator.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { 
    createTask, 
    deleteTask, 
    getTasks, 
    updateTask 
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post("/", validate(createTaskSchema), createTask);
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", getTasks);
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put("/:id", validate(updateTaskSchema), updateTask);
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete("/:id", deleteTask);

export default router;