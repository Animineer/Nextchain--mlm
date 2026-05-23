const Investment = require("../models/Investment");
const ROIHistory = require("../models/ROIHistory");
const LevelIncome = require("../models/LevelIncome");
const User = require("../models/User");

/*
=====================================================
BUILD REFERRAL TREE RECURSIVELY
=====================================================
*/

const buildReferralTree = async (userId) => {
  /*
  Find direct referrals
  */
  const referrals = await User.find({
    referredBy: userId,
  }).select("name email referralCode");

  /*
  Build nested structure
  */
  const tree = [];

  for (const referral of referrals) {
    const children = await buildReferralTree(referral._id);

    tree.push({
      id: referral._id,
      name: referral.name,
      email: referral.email,
      referralCode: referral.referralCode,
      children,
    });
  }

  return tree;
};


const getReferralTree = async (req, res) => {
  try {
    /*
    Build tree recursively
    */
    const tree = await buildReferralTree(req.user._id);

    res.status(200).json({
      success: true,
      tree,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};




const createInvestment = async (
  req,
  res
) => {
  try {
    /*
    Get authenticated user
    */
    const userId = req.user._id;

    /*
    Request body
    */
    const { amount, plan } = req.body;

    /*
    Validation
    */
    if (!amount || !plan) {
      return res.status(400).json({
        message:
          "Amount and plan are required",
      });
    }

    /*
    Plan configurations
    */
    const PLAN_CONFIG = {
      BASIC: {
        dailyROI: 1,
        durationDays: 30,
      },

      STANDARD: {
        dailyROI: 1.5,
        durationDays: 60,
      },

      PREMIUM: {
        dailyROI: 2,
        durationDays: 90,
      },
    };

    /*
    Check valid plan
    */
    const selectedPlan =
      PLAN_CONFIG[plan];

    if (!selectedPlan) {
      return res.status(400).json({
        message: "Invalid plan selected",
      });
    }

    /*
    Start date
    */
    const startDate = new Date();

    /*
    Calculate end date
    */
    const endDate = new Date();

    endDate.setDate(
      endDate.getDate() +
        selectedPlan.durationDays
    );

    /*
    Expected ROI
    */
    const expectedTotalROI =
      (amount *
        selectedPlan.dailyROI *
        selectedPlan.durationDays) /
      100;

    /*
    Create investment
    */
    const investment =
      await Investment.create({
        user: userId,

        amount,

        plan,

        dailyROI:
          selectedPlan.dailyROI,

        startDate,

        endDate,

        expectedTotalROI,

        status: "ACTIVE",
      });

    /*
    Success response
    */
    res.status(201).json({
      success: true,

      message:
        "Investment created successfully",

      investment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Server error creating investment",
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    /*
    Fetch user details
    */
    const user = await User.findById(userId);

    /*
    Fetch all investments
    */
    const investments = await Investment.find({
      user: userId,
    }).sort({ createdAt: -1 });

    /*
    Aggregate total investment
    */
    const investmentStats = await Investment.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,

          totalInvestment: {
            $sum: "$amount",
          },
        },
      },
    ]);

    /*
    Aggregate total ROI earned
    */
    const roiStats = await ROIHistory.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,

          totalROI: {
            $sum: "$amount",
          },
        },
      },
    ]);

    /*
    Aggregate total level income
    */
    const levelIncomeStats = await LevelIncome.aggregate([
      {
        $match: {
          earner: userId,
        },
      },
      {
        $group: {
          _id: null,

          totalLevelIncome: {
            $sum: "$amount",
          },
        },
      },
    ]);

    /*
    Recent ROI history
    */
    const recentROI = await ROIHistory.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    /*
    Recent level income
    */
    const recentLevelIncome = await LevelIncome.find({
      earner: userId,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    /*
    Final response
    */
    res.status(200).json({
      success: true,

      walletBalance: user.walletBalance,

      totalInvestment:
        investmentStats[0]?.totalInvestment || 0,

      totalROI:
        roiStats[0]?.totalROI || 0,

      totalLevelIncome:
        levelIncomeStats[0]?.totalLevelIncome || 0,

      investments,

      recentROI,

      recentLevelIncome,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createInvestment,
  getDashboard,
  getReferralTree,
};