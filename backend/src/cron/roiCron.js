const cron = require("node-cron");

const { processDailyROI } = require("../services/roiService");

/*
=====================================================
DAILY ROI CRON JOB
=====================================================

Runs every day at midnight.
*/

const startROICron = () => {
  // TESTING: Change to every 10 seconds for development
  cron.schedule("0 0 * * * *", async () => {
    try {
      console.log("=================================");
      console.log("Starting ROI Cron Job (10s interval)");
      console.log("=================================");

      /*
      Process all ROI payouts
      */
      await processDailyROI();

      console.log("=================================");
      console.log("ROI Cron Completed Successfully");
      console.log("=================================");
    } catch (error) {
      console.log("Cron Job Error:", error);
    }
  });

  console.log("ROI Cron Job Initialized");
};

module.exports = startROICron;