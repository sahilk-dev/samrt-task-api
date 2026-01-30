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

router.post("/", validate(createTaskSchema), createTask);
router.get("/", getTasks);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;