const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const pollRoutes = require("./routes/polls");

// Load Environment Variables (MONGO_URI)
dotenv.config();

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI is missing in .env file! Exiting.");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- EXPRESS SETUP ---
const app = express();

// --- LOCAL DEVELOPMENT FIX ---
// Use the simple, default cors() setup.
// This will allow http://localhost:5173 to connect.
app.use(cors());
// --- END FIX ---

// Trust proxies for correct IP retrieval (needed for IP-based voting)
app.set("trust proxy", 1); 
app.use(express.json());

// Main API Route
// This MUST match the frontend's baseURL
app.use("/api/polls", pollRoutes);


// --- Standard Local Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Local Server running on ${PORT}`));