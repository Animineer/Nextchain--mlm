const mongoose = require("mongoose");

const Investment = require("../models/Investment");
const ROIHistory = require("../models/ROIHistory");
const LevelIncome = require("../models/LevelIncome");
const User = require("../models/User");

/*
=====================================================
REFERRAL LEVEL PERCENTAGES
=====================================================

Defines MLM commission percentages
for each referral level.
*/

const LEVEL_PERCENTAGES = {
  1: 5,
  2: 2,
  3: 1,
  4: 0.5,
  5: 0.5,
};

/*
=====================================================
NORMALIZE DATE
=====================================================

Converts date to midnight.

Why needed?
- Prevent duplicate daily ROI
- Ensure idempotency
- Consistent date comparison
*/

const normalizeDate = (date) => {
  const d = new Date(date);

  d.setHours(0, 0, 0, 0);

  return d;
};

/*
=====================================================
DISTRIBUTE LEVEL INCOME
=====================================================

Traverses referral hierarchy upward
and distributes commissions.

Idempotency: Unique index on
(investment, earner, level, incomeDate)
prevents duplicate commissions.
*/

const distributeLevelIncome = async (
  sourceUserId,
  investmentId,
  investmentAmount,
  incomeDate
) => {
  /*
  Start from investing user
  */
  let currentUser = await User.findById(
    sourceUserId
  );

  /*
  Traverse up to 5 levels
  */
  for (let level = 1; level <= 5; level++) {
    /*
    Stop if no parent exists
    */
    if (!currentUser?.referredBy) {
      break;
    }

    /*
    Find parent/upline user
    */
    const parentUser = await User.findById(
      currentUser.referredBy
    );

    /*
    Stop if parent not found
    */
    if (!parentUser) {
      break;
    }

    /*
    Get level commission percentage
    */
    const percentage =
      LEVEL_PERCENTAGES[level];

    /*
    Skip if percentage missing
    */
    if (!percentage) {
      currentUser = parentUser;

      continue;
    }

    /*
    Calculate commission amount
    */
    const commissionAmount =
      (investmentAmount * percentage) / 100;

    /*
    Prevent duplicate level income
    */
    const existingIncome =
      await LevelIncome.findOne({
        investment: investmentId,
        earner: parentUser._id,
        level,
        incomeDate,
      });

    /*
    Skip duplicate commission
    */
    if (existingIncome) {
      currentUser = parentUser;

      continue;
    }

    /*
    Create level income record
    */
    await LevelIncome.create(
      {
        earner: parentUser._id,

        sourceUser: sourceUserId,

        investment: investmentId,

        level,

        amount: commissionAmount,

        incomeDate,
      }
    );

    /*
    Update parent wallet
    */
    await User.findByIdAndUpdate(
      parentUser._id,
      {
        $inc: {
          walletBalance:
            commissionAmount,

          totalLevelIncome:
            commissionAmount,
        },
      }
    );

    /*
    Move to next upline
    */
    currentUser = parentUser;
  }
};

/*
=====================================================
PROCESS DAILY ROI
=====================================================

Main business logic engine.

Responsibilities:
1. Find active investments
2. Prevent duplicate payouts
3. Calculate daily ROI
4. Create ROI history
5. Update wallet balances
6. Distribute MLM income
7. Maintain transaction safety
*/

const processDailyROI = async () => {
  try {
    console.log(
      "================================="
    );
    console.log(
      "Starting Daily ROI Processing"
    );
    console.log(
      "================================="
    );

    /*
    Today's normalized date
    */
    const today = normalizeDate(
      new Date()
    );

    /*
    Find all active investments
    */
    const activeInvestments =
      await Investment.find({
        status: "ACTIVE",

        endDate: {
          $gte: today,
        },
      });

    console.log(
      `Found ${activeInvestments.length} active investments`
    );

    /*
    Process investments one-by-one
    */
    for (const investment of activeInvestments) {
      try {
        /*
        Check duplicate ROI
        */
        const existingROI =
          await ROIHistory.findOne({
            investment: investment._id,

            roiDate: today,
          });

        /*
        Skip already processed ROI
        */
        if (existingROI) {
          console.log(
            `ROI already processed for investment ${investment._id}`
          );

          continue;
        }

        /*
        Calculate ROI amount

        Example:
        amount = 1000
        ROI = 1%

        daily ROI = 10
        */
        const roiAmount =
          (investment.amount *
            investment.dailyROI) /
          100;

        /*
        Create ROI history record
        */
        await ROIHistory.create(
          {
            user: investment.user,

            investment:
              investment._id,

            amount: roiAmount,

            roiDate: today,
          }
        );

        /*
        Update user wallet balance
        */
        await User.findByIdAndUpdate(
          investment.user,
          {
            $inc: {
              walletBalance: roiAmount,

              totalROIIncome:
                roiAmount,
            },
          }
        );

        /*
        Update investment stats
        */
        await Investment.findByIdAndUpdate(
          investment._id,
          {
            $inc: {
              totalGeneratedROI:
                roiAmount,
            },

            lastROICalculatedAt:
              today,
          }
        );

        /*
        Distribute referral commissions
        */
        await distributeLevelIncome(
          investment.user,
          investment._id,
          investment.amount,
          today
        );

        /*
        Mark investment completed
        if expired
        */
        if (
          new Date(investment.endDate) <
          today
        ) {
          investment.status =
            "COMPLETED";

          await investment.save();
        }

        console.log(
          `ROI processed successfully for investment ${investment._id}`
        );
      } catch (investmentError) {
        /*
        Log error but continue with next investment
        */
        console.log(
          "Investment processing error:",
          investmentError
        );
      }
    }

    console.log(
      "================================="
    );
    console.log(
      "Daily ROI Processing Completed"
    );
    console.log(
      "================================="
    );
  } catch (error) {
    console.log(
      "ROI Processing Error:",
      error
    );
  }
};

/*
=====================================================
EXPORTS
=====================================================
*/

module.exports = {
  processDailyROI,
};