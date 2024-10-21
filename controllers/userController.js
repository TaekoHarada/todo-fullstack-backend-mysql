import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { getUserByUsername, createUser } from "../models/userModel.js";

// Secret key for JWT signing (use environment variables for production)
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Signup controller
export const signupController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const userId = await createUser(username, hashedPassword);

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login controller
export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch the user from the database
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 3600000, // 1 hour
      domain: "todo-fullstack-frontend-ten.vercel.app",
    });

    console.log("User logged in successfully", token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// logoutController.js
export const logoutController = (req, res) => {
  console.log("Logout");
  // Clear the token cookie
  res.clearCookie("token");

  return res.status(200).json({ message: "Logged out successfully" });
};
