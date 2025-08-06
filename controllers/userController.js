const User = require('../models/user');
const History = require('../models/history');

// 3.1 Create New User
const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    // Debug: log input
    console.log("🔹 Received request to create user with name:", name);

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const user = new User({ name });
    await user.save();

    console.log("✅ User created successfully:", user);

    res.status(201).json(user);
  } catch (err) {
    console.error("❌ Error in createUser:", err.message);
    res.status(500).json({ error: 'Error creating user', details: err.message });
  }
};

// 3.2 Get All Users (Sorted by Points)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error in getAllUsers:", err.message);
    res.status(500).json({ error: 'Error fetching users', details: err.message });
  }
};

// 3.3 Claim Random Points for a User
const claimPoints = async (req, res) => {
  try {
    const userId = req.params.id;
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    console.log(`🔹 Claiming ${randomPoints} points for user ID: ${userId}`);

    const user = await User.findById(userId);
    if (!user) {
      console.warn("⚠️ User not found:", userId);
      return res.status(404).json({ error: 'User not found' });
    }

    user.totalPoints += randomPoints;
    await user.save();

    const history = new History({ userId, points: randomPoints });
    await history.save();

    console.log(`✅ ${randomPoints} points claimed for user ${user.name}`);

    res.status(200).json({
      message: `✅ ${randomPoints} points claimed successfully!`,
      user,
    });
  } catch (err) {
    console.error("❌ Error in claimPoints:", err.message);
    res.status(500).json({ error: 'Error claiming points', details: err.message });
  }
};

// 3.4 Get History for a User
const getUserHistory = async (req, res) => {
  try {
    const userId = req.params.id;
    const history = await History.find({ userId }).sort({ createdAt: -1 });

    console.log(`📜 History fetched for user ID: ${userId}`);

    res.status(200).json(history);
  } catch (err) {
    console.error("❌ Error in getUserHistory:", err.message);
    res.status(500).json({ error: 'Error fetching history', details: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  claimPoints,
  getUserHistory,
};
