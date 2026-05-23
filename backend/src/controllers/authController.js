const User = require("../models/User");
const TokenBlacklist = require("../models/TokenBlacklist");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

/*
=====================================================
REGISTER USER
=====================================================
*/

const registerUser = async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;

    /*
    Validation
    */
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    /*
    Check existing user
    */
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    /*
    Find referring user if referral code provided
    */
    let referredBy = null;

    if (referralCode) {
      const referrer = await User.findOne({
        referralCode,
      });

      if (!referrer) {
        return res.status(400).json({
          message: "Invalid referral code",
        });
      }

      referredBy = referrer._id;
    }

    /*
    Generate unique referral code
    */
    const myReferralCode =
      "REF" + Math.random().toString(36).substring(2, 8).toUpperCase();

    /*
    Create user
    */
    const user = await User.create({
      name,
      email,
      password,
      referralCode: myReferralCode,
      referredBy,
    });

    /*
    Send response
    */
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/*
=====================================================
LOGIN USER
=====================================================
*/

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    /*
    Check user existence
    */
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    /*
    Compare password
    */
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    /*
    Generate token
    */
    const token = generateToken(user._id);

    /*
    Send response
    */
    res.status(200).json({
      success: true,
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        walletBalance: user.walletBalance,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/*
=====================================================
LOGOUT USER (REVOKE TOKEN)
=====================================================
*/

const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(400).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Decode token to find expiry
    const decoded = jwt.decode(token);

    const expiresAt = decoded && decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 24 * 60 * 60 * 1000); // Default to 24 hours if exp not found

    // Store token in blacklist so it cannot be used again
    await TokenBlacklist.create({ token, expiresAt });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error during logout" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
