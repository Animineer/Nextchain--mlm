const jwt = require("jsonwebtoken");

/*
Why needed?

Reusable utility to generate JWT token.
Used during login and registration.
*/

const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;