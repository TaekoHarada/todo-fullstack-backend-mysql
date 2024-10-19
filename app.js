import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// import { createServer } from "http"; // Import http server to work with socket.io
// import { Server } from "socket.io"; // Import Socket.IO server

const app = express();
// Create HTTP server for Socket.IO
// const server = createServer(app); // Wrap express app into an HTTP server
// const PORT = process.env.APP_PORT || 5002;
const PORT = process.env.PORT;

// Initialize Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Allow frontend origin
//     credentials: true,
//   },
// });

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend origin
app.use(cookieParser()); // Use cookie-parser middleware

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes); // Add user authentication routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on HEROKU DINAMIC PORT: ${PORT}`);
});

// Export app for testing purposes
export default app;
