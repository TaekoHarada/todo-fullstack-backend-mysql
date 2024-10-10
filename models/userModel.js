import pool from "../db.js";

// Fetch user by username
export const getUserByUsername = async (username) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Create new user
export const createUser = async (username, hashedPassword) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  }
};
