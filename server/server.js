import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./Routes/userRoutes.js";

// Load environment variables from the .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS middleware to allow cross-origin requests
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3002",
    credentials: true,
  })
);

// Define a root route to check if the server is running
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running 🚀" });
});

// Use the user routes for all API calls to /api/user
app.use("/api/user", userRouter);

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Generic Error Handler for server errors
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Server error" });
});

// ✅ Export for Vercel
export default app;
