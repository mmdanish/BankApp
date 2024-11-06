import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getUserProfile,
  editUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Register route
router.post(
  "/register",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  registerUser
);

// Login route
router.post("/login", loginUser);

// Profile route
router.get("/profile", authMiddleware, getUserProfile);

// update profile route
router.put("/update", authMiddleware, upload.single("image"), editUserProfile);




export default router;
