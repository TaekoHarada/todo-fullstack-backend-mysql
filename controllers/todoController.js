// controllers/todoController.js
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../models/todoModel.js";

// Get all todos
export const getTodosController = async (req, res) => {
  try {
    const todos = await getTodos(); // Call the model function
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new todo
export const createTodoController = async (req, res) => {
  const { title, completed = false } = req.body;
  try {
    const id = await createTodo(title, completed); // Call the model function
    res.status(201).json({ id, title, completed });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a todo
export const deleteTodoController = async (req, res) => {
  try {
    const affectedRows = await deleteTodo(req.params.id); // Call the model function
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" }); // Handle not found case
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a todo
export const updateTodoController = async (req, res) => {
  const { title, completed } = req.body;
  try {
    await updateTodo(req.params.id, title, completed); // Call the model function
    res.status(200).json({ id: req.params.id, title, completed });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
