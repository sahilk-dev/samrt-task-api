import express from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

// Redirect to google
/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Login with Google OAuth
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google login page
 */
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// Google callback
/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful login returns JWT token
 */
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/auth/failure",
    }),
    (req, res) => {

        const user = req.user;

        const token = generateToken({
            userId: user._id,
            provider: user.provider,
        });

        res.status(200).json({
            message: "Login successful",
            token,
        });
    }
);
/**
 * @swagger
 * /auth/failure:
 *   get:
 *     summary: OAuth failure response
 *     tags: [Auth]
 *     responses:
 *       401:
 *         description: Authentication failed
 */
router.get("/failure", (req, res) => {
    res.status(401).json({ message: "Google authentication failed" });
});

export default router;