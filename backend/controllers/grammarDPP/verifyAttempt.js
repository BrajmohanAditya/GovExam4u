


import attemptedTest from "../../models/grammarDPP/attemptedTest.js";

const verifyAttempt = async (req, res) => {
  try {
    const userId = req.user._id;
    const { set } = req.body;

    if (!set) {
      return res.status(400).json({
        status: false,
        message: "Set is required",
      });
    }

    const attempt = await attemptedTest.findOne({ userId, set });

    return res.json({
      status: true,
      attempted: !!attempt,
      score: attempt?.score ?? null, // optional
      name: attempt?.name,
      answers: attempt?.answers ?? {},
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export default verifyAttempt;