const express = require("express");
const {authLimiter,} = require("../middleware/rateLimiter");

const {
    registerUser,
    loginUser,
    logoutUser,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/*
Public Routes
*/

router.post("/register", registerUser);

router.post("/login", authLimiter,loginUser);

// Protected logout route (revokes token)
router.post("/logout", protect, logoutUser);

module.exports = router;