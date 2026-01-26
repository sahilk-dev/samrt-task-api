import express from "express";
import cors from "cors";

const app = express()

// Global middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is perfectly healthy",
    });
});

export default app;