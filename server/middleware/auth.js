import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else {
        token = req.headers.authorization;
    }

    if (!token) {
        return res.json({ success: false, message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.json({ success: false, message: "User not found" });
        }
        next();
    } catch (error) {
        return res.json({ success: false, message: "Not authorized, token invalid" });
    }
};
