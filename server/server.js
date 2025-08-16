import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./Routes/userRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// ✅ Database connection
connectDB();

// ✅ Middlewares
app.use(express.json());

// ✅ Proper CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3002", // React frontend URL
    credentials: true, // allow cookies / auth headers
  })
);

// ✅ Routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running 🚀" });
});

app.use("/api/user", userRouter);

// ✅ Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Server error" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
