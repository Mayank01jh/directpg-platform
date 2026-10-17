require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { connectMongoDB, getMongoStatus } = require("./config/db");
const { getSupabaseStatus } = require("./config/supabase");

const authRoutes = require("./routes/auth");
const propertiesRoutes = require("./routes/properties");
const bookingsRoutes = require("./routes/bookings");
const visitsRoutes = require("./routes/visits");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (Handles User Auth & Sensitive Credentials)
connectMongoDB();

// Security & Logging Middlewares
app.use(helmet());
app.use(morgan("dev"));

// Dynamic CORS configuration allowing localhost and Vercel production domains
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      // Allow all localhost origins
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }
      // Allow vercel preview and production deployments
      if (origin.endsWith(".vercel.app") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for initial ease of setup
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// -------------------------------------------------------------
// Health Check & System Status Endpoint (Crucial for Render)
// -------------------------------------------------------------
const healthHandler = (req, res) => {
  const mongo = getMongoStatus();
  const supabase = getSupabaseStatus();

  return res.status(200).json({
    status: "ok",
    service: "DirectPG Production API",
    version: "1.0.0",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    databases: {
      mongodb: {
        role: "Authentication, Password Hashes, Security Audit & KYC Credentials",
        connected: mongo.connected,
        readyState: mongo.readyState === 1 ? "Connected" : "Fallback/Offline",
      },
      supabase: {
        role: "PG Properties, Room Plans, Bookings, Scheduled Visits & Reviews",
        configured: supabase.configured,
        endpoint: supabase.url,
      },
    },
  });
};

app.get("/health", healthHandler);
app.get("/api/health", healthHandler);

// Root Welcome Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    name: "DirectPG API Server",
    description: "Zero Brokerage PG & Coliving Platform Backend",
    docs: {
      auth: "/api/auth (MongoDB - Login, Register, KYC Credentials)",
      listings: "/api/listings (Supabase - PG Properties & Filters)",
      bookings: "/api/bookings (Supabase - Room Bookings & Payments)",
      visits: "/api/visits (Supabase - Physical & Virtual Walkthroughs)",
      health: "/health",
    },
  });
});

// -------------------------------------------------------------
// Route Mounting: Supports /api, /v1, and /api/v1 prefixes
// -------------------------------------------------------------
const mountRoutes = (prefix) => {
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/listings`, propertiesRoutes);
  app.use(`${prefix}/properties`, propertiesRoutes);
  app.use(`${prefix}/bookings`, bookingsRoutes);
  app.use(`${prefix}/visits`, visitsRoutes);
};

mountRoutes("/api");
mountRoutes("/v1");
mountRoutes("/api/v1");
mountRoutes(""); // Direct mounts for frontend convenience

// -------------------------------------------------------------
// 404 Handler
// -------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// -------------------------------------------------------------
// Global Error Handler
// -------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 [DirectPG Server] Running on port ${PORT}`);
  console.log(`📡 MongoDB (Auth/KYC): Checked at startup`);
  console.log(`⚡ Supabase (Properties/Bookings): Initialized`);
});

module.exports = app;
