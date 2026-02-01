import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import passport from "passport";
import configurePassport from "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.route.js";
import taskRoutes from "./routes/task.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import rateLimiter from "./middlewares/rateLimiter.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

dotenv.config()
const app = express()

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Initialize passport
configurePassport();
app.use(passport.initialize());

// Health check route
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Server health check
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Server is running
 */
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is perfectly healthy",
    });
});

// Routes
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

export default app;