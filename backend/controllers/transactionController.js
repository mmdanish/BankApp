import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

// Deposit
export const deposit = async (req, res) => {
  const { amount, details } = req.body;
  const userId = req.user.id; // Get user ID from token verification middleware

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const depositAmount = Number(amount);
    const newBalance = user.balance + depositAmount; // Ensure amount is a number

    const transaction = new Transaction({
      user: userId,
      amount: depositAmount,
      details,
      balance: newBalance,
      date: new Date(),
    });

    await transaction.save();
    user.balance = newBalance; // Update user balance
    await user.save();

    // Create a notification after the deposit
    try {
      const notification = new Notification({
        user: userId,
        message: `You have successfully deposited ${amount}. New balance: ${newBalance}`,
      });
      await notification.save();
    } catch (err) {
      console.error("Notification creation failed:", err);
    }

    res.status(201).json({ message: "Deposit successful", transaction });
  } catch (err) {
    console.error("Error during deposit:", err); // Detailed error logging
    res.status(500).json({ error: err.message });
  }
};

// Withdraw
export const withdraw = async (req, res) => {
  const { amount, details } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const withdrawAmount = Number(amount);
    if (user.balance < withdrawAmount || withdrawAmount <= 0) {
      return res.status(400).json({ message: "Insufficient funds or invalid amount" });
    }

    const newBalance = user.balance - withdrawAmount;

    const transaction = new Transaction({
      user: userId,
      amount: -withdrawAmount, // Negative for withdrawal
      details,
      balance: newBalance,
      date: new Date(),
    });

    await transaction.save();
    user.balance = newBalance; // Update user balance
    await user.save();

    // Create a notification after the withdrawal
    try {
      const notification = new Notification({
        user: userId,
        message: `You have successfully withdrawn ${amount}. New balance: ${newBalance}`,
      });
      await notification.save();
    } catch (err) {
      console.error("Notification creation failed:", err);
    }

    res.status(201).json({ message: "Withdrawal successful", transaction });
  } catch (err) {
    console.error("Error during withdrawal:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get transaction history
export const getTransactionHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const transactions = await Transaction.find({ user: userId }).sort({ _id: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user transaction history by username
export const getUserTransactionHistoryByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const transactions = await Transaction.find({ user: user._id }).sort({ _id: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};