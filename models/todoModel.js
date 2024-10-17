import pool from "../db.js";

export const getTodos = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM todos");
    return rows;
  } catch (error) {
    console.error("Error fetching todos: ", error);
    throw error;
  }
};

export const createTodo = async (title, completed) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO todos (title, completed) VALUES (?, ?)",
      [title, completed]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating todo: ", error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM todos WHERE id = ?", [id]);
    return result.affectedRows; // Return the number of affected rows
  } catch (error) {
    console.error("Error deleting todo: ", error);
    throw error;
  }
};

export const updateTodo = async (id, title, completed) => {
  try {
    await pool.query("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [
      title,
      completed,
      id,
    ]);
  } catch (error) {
    console.error("Error updating todo: ", error);
    throw error;
  }
};
