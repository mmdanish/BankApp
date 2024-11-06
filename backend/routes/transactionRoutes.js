import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  deposit,
  getTransactionHistory,
  getUserTransactionHistoryByUsername,
  withdraw,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/deposit", authMiddleware, deposit);
router.post("/withdraw", authMiddleware, withdraw);
router.get("/history", authMiddleware, getTransactionHistory);
router.get(
  "/history/:username",
  authMiddleware,
  getUserTransactionHistoryByUsername
);

export default router;
