import SubmittedTest from "../../models/allSubQuiz/submittedTest.js";

const leaderboard = async (req, res) => {
  try {
    const { set } = req.body;

    if (!set)
      return res
        .status(400)
        .json({ status: false, message: "Set is required" });

    const results = await SubmittedTest.find({ set })
      .select("name score userId")
      .sort({ score: -1 })
      .lean();

    const formattedResults = results.map((r) => ({
      name: r.name,
      score: r.score,
      userId: r.userId,
    }));

    return res.json({ status: true, data: formattedResults });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

export default leaderboard;
