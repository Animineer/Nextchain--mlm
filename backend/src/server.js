require("dotenv").config();
const startROICron = require("./cron/roiCron");

const app = require("./app");
const connectDB = require("./config/db");

/*
Connect database
*/
connectDB();

/*
Start cron scheduler
*/
startROICron();

/*
Server port
*/
const PORT = process.env.PORT || 5000;

/*
Start server
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});