import express from "express";
import {
  getTodosController,
  createTodoController,
  deleteTodoController,
  updateTodoController,
} from "../controllers/todoController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect the routes with authentication middleware
router.get("/", authenticateToken, getTodosController);
router.post("/", authenticateToken, createTodoController);
router.delete("/:id", authenticateToken, deleteTodoController);
router.put("/:id", authenticateToken, updateTodoController);

export default router;
