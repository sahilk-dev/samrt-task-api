import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Get logged-in user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details returned
 */
router.get("/me", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Protected route accessed successfully",
        user: req.user
    });
});

export default router;