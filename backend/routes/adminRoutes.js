import express from "express";
import { getUserByRole, getUserByUsername, getUserCount } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

// Get user count (admin)
router.get("/count", authMiddleware, getUserCount);

export default router; 

// Route to get users by role
router.get("/users", authMiddleware, getUserByRole);

// Get user by username
router.get('/users/:username', getUserByUsername); 