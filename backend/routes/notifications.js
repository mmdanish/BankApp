import express from "express";
const router = express.Router();
import { authMiddleware } from "../middleware/authMiddleware.js";
import Notification from "../models/Notification.js";

// GET /api/notifications - Fetch notifications for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const notifications = await Notification.find({ user: userId, read: false }).sort({
      timestamp: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

// POST / - Create a new notification
router.post("/", authMiddleware, async (req, res) => {
  const { message } = req.body;
  try {
    const notification = new Notification({
      user: req.user.id, // assuming the notification is for the logged-in user
      message,
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Failed to create notification" });
  }
});

// PUT /:id - Mark a notification as read
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = true;
    await notification.save();

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Failed to update notification" });
  }
});

export default router;
