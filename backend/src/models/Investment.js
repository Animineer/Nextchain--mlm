const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
    {
        // Owner of investment
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        // Investment amount
        amount: {
            type: Number,
            required: true,
            min: 1,
        },

        // Investment plan name
        plan: {
            type: String,
            required: true,
        },

        // Daily ROI percentage
        dailyROI: {
            type: Number,
            required: true,
        },

        expectedTotalROI: {
            type: Number,
            default: 0,
        },

        // Start date
        startDate: {
            type: Date,
            default: Date.now,
        },

        // End date / maturity
        endDate: {
            type: Date,
            required: true,
        },

        // Current investment status
        status: {
            type: String,
            enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
            default: "ACTIVE",
        },

        // Total ROI generated till now
        totalGeneratedROI: {
            type: Number,
            default: 0,
        },

        lastROICalculatedAt: {
            type: Date,
            default: null,
        },


    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Investment", investmentSchema);