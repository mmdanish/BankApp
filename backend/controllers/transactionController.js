import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

// Deposit
export const deposit = async (req, res) => {
  const { amount, details } = req.body;
  const userId = req.user.id; // Get user ID from token verification middleware

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newBalance = user.balance + Number(amount); // Ensure amount is a number

    const transaction = new Transaction({
      user: userId,
      amount: Number(amount),
      details,
      balance: newBalance,
    });

    await transaction.save();
    user.balance = newBalance; // Update user balance
    await user.save();

    res.status(201).json({ message: "Deposit successful", transaction });
  } catch (err) {
    console.error('Error during deposit:', err); // Detailed error logging
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

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const newBalance = user.balance - amount;

    const transaction = new Transaction({
      user: userId,
      amount: -amount, // Negative for withdrawal
      details,
      balance: newBalance,
    });

    await transaction.save();
    user.balance = newBalance; // Update user balance
    await user.save();

    res.status(201).json({ message: "Withdrawal successful", transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get transaction history
export const getTransactionHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const transactions = await Transaction.find({ user: userId }).sort({
      date: -1,
    });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserTransactionHistoryByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const transactions = await Transaction.find({ user: user._id }).sort({
      date: -1,
    });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
