const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // Full name of user
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Unique email for login
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // Hashed password
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Referral code generated for each user
    referralCode: {
      type: String,
      unique: true,
    },

    // Parent user who referred this user
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index:true,
    },

    // User wallet balance
    walletBalance: {
      type: Number,
      default: 0,
    },

    // Total ROI earned
    totalROIIncome: {
      type: Number,
      default: 0,
    },

    // Total referral income earned
    totalLevelIncome: {
      type: Number,
      default: 0,
    },

    // Account status
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

/*
Why needed?
Automatically hashes password before saving.
Never store plain passwords.
*/
userSchema.pre("save", async function () {
  // Only hash if password modified
  if (!this.isModified("password")) {
    return;
  }

  // Generate salt
  const salt = await bcrypt.genSalt(10);

  // Hash password
  this.password = await bcrypt.hash(this.password, salt);
});

/*
Why needed?
Reusable password comparison method.
*/
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);