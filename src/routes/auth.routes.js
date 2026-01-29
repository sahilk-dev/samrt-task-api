import express from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

// Redirect to google
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// Google callback
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

router.get("/failure", (req, res) => {
    res.status(401).json({ message: "Google authentication failed" });
});

export default router;