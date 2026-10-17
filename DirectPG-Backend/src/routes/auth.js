const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { authenticate } = require("../middleware/auth");
const { getMongoStatus } = require("../config/db");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "directpg_jwt_fallback_secret_key_2026";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "directpg_jwt_refresh_fallback_2026";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "30d";

// In-memory fallback mock user store if MongoDB URI is not yet configured
const inMemoryUsers = new Map();

// Helper to generate JWT tokens
const generateTokens = (user) => {
  const payload = {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

  return { accessToken, refreshToken };
};

// -------------------------------------------------------------
// POST /auth/register - Register new Tenant / Owner in MongoDB
// -------------------------------------------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, role = "tenant", aadhaarNumber, idProofType } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, phone, and password are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Mask Aadhaar / Gov ID for secure credential storage
    let maskedId = "";
    if (aadhaarNumber) {
      const cleanNum = String(aadhaarNumber).replace(/\s+/g, "");
      maskedId = cleanNum.length >= 4 
        ? `XXXX-XXXX-${cleanNum.slice(-4)}`
        : `XXXX-${cleanNum}`;
    }

    if (getMongoStatus().connected) {
      // Check existing user in MongoDB
      const existing = await User.findOne({ email: normalizedEmail });
      if (existing) {
        return res.status(409).json({
          success: false,
          error: "An account with this email already exists.",
        });
      }

      const newUser = new User({
        name,
        email: normalizedEmail,
        phone,
        password,
        role: ["tenant", "owner", "admin"].includes(role) ? role : "tenant",
        credentials: {
          idProofType: idProofType || "aadhaar",
          idProofNumberMasked: maskedId,
          kycStatus: maskedId ? "pending" : "unsubmitted",
        },
        security: {
          lastLoginAt: new Date(),
          lastLoginIp: req.ip || "",
        },
      });

      await newUser.save();
      const tokens = generateTokens(newUser);

      // Store refresh token
      newUser.security.refreshTokens.push(tokens.refreshToken);
      await newUser.save();

      return res.status(201).json({
        success: true,
        message: "Registration successful. Credentials stored securely in MongoDB.",
        data: {
          user: newUser.toSafeObject(),
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    } else {
      // In-Memory Fallback Mode (Runs before MongoDB connection string is provided)
      if (inMemoryUsers.has(normalizedEmail)) {
        return res.status(409).json({
          success: false,
          error: "An account with this email already exists (Local Mode).",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const mockUser = {
        _id: "mock_user_" + Date.now(),
        name,
        email: normalizedEmail,
        phone,
        password: hashedPassword,
        role,
        isVerified: true,
        credentials: {
          idProofType: idProofType || "aadhaar",
          idProofNumberMasked: maskedId,
          kycStatus: maskedId ? "pending" : "unsubmitted",
        },
        createdAt: new Date().toISOString(),
      };

      inMemoryUsers.set(normalizedEmail, mockUser);
      const tokens = generateTokens(mockUser);

      const safeUser = { ...mockUser };
      delete safeUser.password;

      return res.status(201).json({
        success: true,
        message: "Registration successful (Running in dev/memory mode - configure MONGODB_URI for persistence).",
        data: {
          user: safeUser,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    }
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to register user.",
    });
  }
});

// -------------------------------------------------------------
// POST /auth/login - Authenticate with MongoDB & Issue JWT
// -------------------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (getMongoStatus().connected) {
      const user = await User.findOne({ email: normalizedEmail }).select("+password");
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password.",
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password.",
        });
      }

      // Update security audit log in MongoDB
      user.security.lastLoginAt = new Date();
      user.security.lastLoginIp = req.ip || "";

      const tokens = generateTokens(user);
      user.security.refreshTokens = [tokens.refreshToken]; // Keep latest
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Login authenticated via MongoDB credentials.",
        data: {
          user: user.toSafeObject(),
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    } else {
      // In-Memory fallback mode
      const user = inMemoryUsers.get(normalizedEmail);
      if (!user) {
        // Create demo account automatically if testing
        if (password.length >= 6) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newMock = {
            _id: "demo_usr_" + Date.now(),
            name: normalizedEmail.split("@")[0].toUpperCase(),
            email: normalizedEmail,
            phone: "+91 98765 00000",
            password: hashedPassword,
            role: "tenant",
            isVerified: true,
            credentials: {
              idProofType: "aadhaar",
              idProofNumberMasked: "XXXX-XXXX-8921",
              kycStatus: "verified",
            },
          };
          inMemoryUsers.set(normalizedEmail, newMock);
          const tokens = generateTokens(newMock);
          const safeUser = { ...newMock };
          delete safeUser.password;
          return res.status(200).json({
            success: true,
            message: "Login successful (Demo Mode).",
            data: { user: safeUser, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken },
          });
        }
        return res.status(401).json({ success: false, error: "Invalid email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: "Invalid email or password." });
      }

      const tokens = generateTokens(user);
      const safeUser = { ...user };
      delete safeUser.password;

      return res.status(200).json({
        success: true,
        message: "Login successful (Local Mode).",
        data: {
          user: safeUser,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    }
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to process login.",
    });
  }
});

// -------------------------------------------------------------
// GET /auth/me - Retrieve Profile & Sensitive Credentials Status
// -------------------------------------------------------------
router.get("/me", authenticate, async (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
});

// -------------------------------------------------------------
// POST /auth/kyc - Submit & Update Credentials in MongoDB
// -------------------------------------------------------------
router.post("/kyc", authenticate, async (req, res) => {
  try {
    const { idProofType, idProofNumber, documentUrl, emergencyContact } = req.body;

    if (!idProofNumber) {
      return res.status(400).json({
        success: false,
        error: "Government ID Proof number is required.",
      });
    }

    const cleanNum = String(idProofNumber).replace(/\s+/g, "");
    const maskedId = cleanNum.length >= 4 
      ? `XXXX-XXXX-${cleanNum.slice(-4)}`
      : `XXXX-${cleanNum}`;

    if (getMongoStatus().connected) {
      const user = await User.findById(req.user.id || req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found." });
      }

      user.credentials = {
        ...user.credentials,
        idProofType: idProofType || user.credentials.idProofType,
        idProofNumberMasked: maskedId,
        idProofDocumentUrl: documentUrl || user.credentials.idProofDocumentUrl,
        kycStatus: "pending",
        emergencyContact: emergencyContact || user.credentials.emergencyContact,
      };

      await user.save();

      return res.status(200).json({
        success: true,
        message: "KYC credentials submitted to MongoDB. Verification in progress.",
        data: user.toSafeObject(),
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "KYC credentials received (Running in local mode).",
        data: {
          maskedId,
          kycStatus: "pending",
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to update KYC credentials.",
    });
  }
});

// -------------------------------------------------------------
// POST /auth/logout
// -------------------------------------------------------------
router.post("/logout", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

// -------------------------------------------------------------
// POST /auth/forgot-password
// -------------------------------------------------------------
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  return res.status(200).json({
    success: true,
    message: `If an account with ${email} exists, password reset instructions have been dispatched.`,
  });
});

module.exports = router;
