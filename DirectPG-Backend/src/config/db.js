const mongoose = require("mongoose");

let isConnected = false;

const connectMongoDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes("<username>")) {
    console.warn("⚠️ [MongoDB] MONGODB_URI is not set or contains placeholders. MongoDB running in fallback mock mode.");
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ [MongoDB] Connected to database: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.error("❌ [MongoDB] Connection error:", err.message);
    isConnected = false;
    return false;
  }
};

const getMongoStatus = () => ({
  connected: isConnected,
  readyState: mongoose.connection.readyState, // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
});

module.exports = { connectMongoDB, getMongoStatus };
