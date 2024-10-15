import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../controllers/userController.js";

const router = express.Router();

// Signup route
router.post("/signup", signupController);

// Login route
router.post("/login", loginController);

router.post("/logout", logoutController);

export default router;
