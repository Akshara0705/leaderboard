const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ✅ Test Route
router.get('/test', (req, res) => {
  res.send('✅ API is working!');
});

// 3.1 Create New User
router.post('/create', userController.createUser);

// 3.2 Get All Users (Sorted by Points)
router.get('/all', userController.getAllUsers);

// 3.3 Claim Random Points for a User
router.post('/claim/:id', userController.claimPoints);

// 3.4 Get History for a User
router.get('/history/:id', userController.getUserHistory);

// Other routes (if you have any)
module.exports = router;
