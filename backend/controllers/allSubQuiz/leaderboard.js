// controllers/grammarDPP/leaderboard.js
import attemptedTest from "../../models/grammarDPP/attemptedTest.js";

const leaderboard = async (req, res) => {
  try {
    const { set } = req.body;

    if (!set) {
      return res.status(400).json({
        status: false,
        message: "Set is required",
      });
    }

    const results = await attemptedTest
      .find({ set })
      .select("name score userId")
      .sort({ score: -1 }); // highest marks first

    return res.json({
      status: true,
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export default leaderboard;
