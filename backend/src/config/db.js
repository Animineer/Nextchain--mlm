const mongoose = require("mongoose");

/*
Why needed?

Central MongoDB connection setup.
*/

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

module.exports = connectDB;