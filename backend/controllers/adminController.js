import User from "../models/User.js";

// Get User Count
export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "user" });
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching user count: ", err);
    res.status(500).json({ error: "Error fetching user count" });
  }
};

// Get users with role 'user'
export const getUserByRole = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by username
export const getUserByUsername = async (req, res) => {
  const { username } = req.params; // Get username from URL parameters
  try {
    const user = await User.findOne({ username, role: "user" }); // Find user with the specified username
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // Handle user not found
    }
    res.status(200).json(user); // Return the user data
  } catch (error) {
    console.error("Error fetching user details: ", error);
    res.status(500).json({ error: "Error fetching user details" }); // Handle server errors
  }
};
