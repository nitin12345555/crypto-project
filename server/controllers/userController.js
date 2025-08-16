import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helper function to generate a JWT token
const generateToken = (userId) => {
    // The secret key is loaded from the .env file
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User controller function
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }

        // Check password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await User.create({ name, email, password: hashedPassword });

        // Generate a token for the new user
        const token = generateToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during user registration:", error.message);
        res.json({ success: false, message: "Server error" });
    }
};

// Login User controller function
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Generate a new token and send it back
        const token = generateToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during user login:", error.message);
        res.json({ success: false, message: "Server error" });
    }
};
