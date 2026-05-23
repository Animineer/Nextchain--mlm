const express = require("express");

const { processDailyROI } = require("../services/roiService");

const router = express.Router();

/*
Manual ROI trigger for testing
*/
router.get("/run-roi", async (req, res) => {
  try {
    await processDailyROI();

    res.json({
      success: true,
      message: "ROI processed manually",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error running ROI",
    });
  }
});

module.exports = router;