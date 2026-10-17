const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password in default queries
    },
    role: {
      type: String,
      enum: ["tenant", "owner", "admin"],
      default: "tenant",
    },
    avatar: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    // -------------------------------------------------------------
    // SENSITIVE CREDENTIALS & e-KYC VERIFICATION STORAGE (MongoDB)
    // -------------------------------------------------------------
    credentials: {
      idProofType: {
        type: String,
        enum: ["aadhaar", "pan", "passport", "voter_id", "driving_license"],
        default: "aadhaar",
      },
      idProofNumberMasked: {
        type: String,
        default: "",
      },
      idProofDocumentUrl: {
        type: String,
        default: "",
      },
      kycStatus: {
        type: String,
        enum: ["unsubmitted", "pending", "verified", "rejected"],
        default: "unsubmitted",
      },
      kycVerifiedAt: {
        type: Date,
      },
      emergencyContact: {
        name: { type: String, default: "" },
        phone: { type: String, default: "" },
        relation: { type: String, default: "" },
      },
      bankDetails: {
        accountHolderName: { type: String, default: "" },
        accountNumberMasked: { type: String, default: "" },
        ifscCode: { type: String, default: "" },
        upiId: { type: String, default: "" },
      },
    },

    // -------------------------------------------------------------
    // SECURITY AUDIT & TOKEN STORAGE
    // -------------------------------------------------------------
    security: {
      refreshTokens: [{ type: String }],
      lastLoginAt: { type: Date, default: Date.now },
      lastLoginIp: { type: String, default: "" },
      passwordResetToken: { type: String },
      passwordResetExpires: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare candidate password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Safe JSON serialization without sensitive hash
UserSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password;
  if (obj.security) {
    delete obj.security.refreshTokens;
    delete obj.security.passwordResetToken;
  }
  return obj;
};

module.exports = mongoose.model("User", UserSchema);
