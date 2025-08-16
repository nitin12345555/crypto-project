import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./Routes/userRoutes.js";

dotenv.config();
const app = express();

// DB connection
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3002",
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running 🚀" });
});

app.use("/api/user", userRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Server error" });
});

// ✅ Export for Vercel
export default app;
