const express = require("express");

const {
  createInvestment,
  getDashboard,
  getReferralTree,
} = require("../controllers/investmentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/*
Protected Routes
*/

router.post("/", protect, createInvestment);

router.get("/dashboard", protect, getDashboard);

router.get("/referral-tree", protect, getReferralTree);

module.exports = router;