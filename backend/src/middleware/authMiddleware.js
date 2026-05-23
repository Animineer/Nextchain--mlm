const jwt = require("jsonwebtoken");
const User = require("../models/User");
const TokenBlacklist = require("../models/TokenBlacklist");

/*
Why needed?

Verifies JWT token.
Protects private routes.
*/

const protect = async (req, res, next) => {
  try {
    let token;

    /*
    Token format:
    Authorization: Bearer TOKEN
    */
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    /*
    No token
    */
    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    /*
    Check token revocation (logout)
    */
    const revoked = await TokenBlacklist.findOne({ token });

    if (revoked) {
      return res.status(401).json({ message: "Token revoked" });
    }

    /*
    Verify token
    */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /*
    Attach user to request
    */
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = {
  protect,
};