import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./Routes/userRoutes.js";

dotenv.config();

const app = express();

// Improved connection handling
connectDB().then(() => {
  console.log("Database connected successfully");
}).catch(err => {
  console.error("Database connection failed:", err);
});

app.use(express.json());

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "Server is running 🚀",
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api/user", userRouter);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// For Vercel deployment
export default app;
