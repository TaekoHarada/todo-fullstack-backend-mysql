import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.APP_PORT || 5002;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend origin
app.use(cookieParser()); // Use cookie-parser middleware

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes); // Add user authentication routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
