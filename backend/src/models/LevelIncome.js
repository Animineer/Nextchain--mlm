const mongoose = require("mongoose");

const levelIncomeSchema = new mongoose.Schema(
  {
    // User receiving commission
    earner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // User whose investment generated commission
    sourceUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Investment source
    investment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
      required: true,
    },

    // Referral level
    level: {
      type: Number,
      required: true,
    },

    // Commission amount
    amount: {
      type: Number,
      required: true,
    },

    // Date of commission
    incomeDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

levelIncomeSchema.index(
  {
    investment: 1,
    earner: 1,
    level: 1,
    incomeDate: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("LevelIncome", levelIncomeSchema);