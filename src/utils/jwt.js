import jwt from "jsonwebtoken";

// Generate JWT for authenticated users
export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};

// Verify jwt from request
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};