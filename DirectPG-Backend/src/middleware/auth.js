const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { getMongoStatus } = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET || "directpg_jwt_fallback_secret_key_2026";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Access denied. Bearer token missing.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // If MongoDB is connected, load latest user object
    if (getMongoStatus().connected) {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "User not found or session expired.",
        });
      }
      req.user = user.toSafeObject();
    } else {
      // In offline/mock fallback mode
      req.user = {
        id: decoded.id,
        name: decoded.name || "Test User",
        email: decoded.email || "user@directpg.in",
        role: decoded.role || "tenant",
      };
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token.",
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access forbidden: requires role ${roles.join(" or ")}`,
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
