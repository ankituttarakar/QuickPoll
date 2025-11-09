const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const serverless = require("serverless-http"); 
const pollRoutes = require("./routes/polls");

// Load Environment Variables (MONGO_URI)
dotenv.config();

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI is missing in .env file! Exiting.");
  // Removed process.exit(1) here for smoother serverless deployment, 
  // although mongoose will still throw errors below.
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- EXPRESS SETUP ---
const app = express();

// --- CRITICAL CORS FIX FOR VERSEL SERVERLESS ---
// We explicitly whitelist the frontend domain to prevent 404/CORS errors
// YOU MUST CHANGE THE PLACEHOLDER DOMAIN BELOW TO MATCH YOUR LIVE FRONTEND DOMAIN
const allowedOrigins = [
  'https://ankit-qp-frontend.vercel.app', // <-- REPLACE THIS WITH YOUR ACTUAL LIVE FRONTEND DOMAIN
  'http://localhost:5173',                 // Local Vite development
  'http://localhost:5000'                  // Local backend development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., from Postman or local access)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // Reject if origin is not in the whitelist
      return callback(new Error(`CORS Policy: Access denied for ${origin}`), false);
    }
    return callback(null, true); // Allow the request
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
}));
// --- END CORS FIX ---

// Trust proxies for correct IP retrieval (needed for IP-based voting)
app.set("trust proxy", 1); 
app.use(express.json());

// Main API Route
app.use("/polls", pollRoutes);

// --- Vercel Serverless Export ---
// This wraps the Express app so Vercel can run it as a function
module.exports.handler = serverless(app);

// Keep the local listener for local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Local Server running on ${PORT}`));
}
