const rateLimit = require(
  "express-rate-limit"
);

/*
Prevent brute-force attacks
*/

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 10,

  message:
    "Too many requests, try later",
});

module.exports = {
  authLimiter,
};