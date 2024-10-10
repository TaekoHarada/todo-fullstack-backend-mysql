import express from "express";
import {
  signupController,
  loginController,
} from "../controllers/userController.js";

const router = express.Router();

// Signup route
router.post("/signup", signupController);

// Login route
router.post("/login", loginController);

export default router;
