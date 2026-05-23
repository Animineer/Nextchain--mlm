const mongoose = require("mongoose");

const roiHistorySchema = new mongoose.Schema(
  {
    // User receiving ROI
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Investment generating ROI
    investment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
      required: true,
      index: true,
    },

    // ROI amount generated
    amount: {
      type: Number,
      required: true,
    },

    // ROI calculation date
    roiDate: {
      type: Date,
      required: true,
    },

    // Prevent duplicate daily payout
    isCredited: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/*
VERY IMPORTANT

This unique index prevents:
same investment getting ROI twice
for same day.

Critical for idempotency.
*/
roiHistorySchema.index(
  {
    investment: 1,
    roiDate: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("ROIHistory", roiHistorySchema);