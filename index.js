// 1. Load environment variables first
require('dotenv').config();

// 2. Import other dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//
const userRoutes = require('./routes/userRoutes');

// 3. Setup
const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

// 4. Middleware
app.use(cors());
app.use(express.json());

// 5. MongoDB connection (WITH TLS DISABLED FOR DEBUGGING)
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tlsAllowInvalidCertificates: true, // <- Add this line
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));


app.use('/api/users', userRoutes);

// 8. Default route (optional)
app.get('/', (req, res) => {
  res.send('🏆 Leaderboard backend is running');
});

// 9. Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
