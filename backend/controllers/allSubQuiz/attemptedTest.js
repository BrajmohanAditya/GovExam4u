import SubmittedTest from "../../models/allSubQuiz/submittedTest.js";

/* ================= SUBMIT / SAVE TEST (MongoDB) ================= */
const submitTestController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.user;
    const { set, score, answers } = req.body;

    if (!set) {
      return res
        .status(400)
        .json({ status: false, message: "Set is required" });
    }

    await SubmittedTest.create({
      userId,
      name,
      email,
      set,
      score,
      answers,
    });

    return res.json({ status: true, message: "Test submitted successfully" });
  } catch (err) {
    // Mongo duplicate key error
    if (err?.code === 11000) {
      return res
        .status(400)
        .json({ status: false, message: "Test already submitted" });
    }

    return res.status(500).json({ status: false, message: "Server error" });
  }
};

export default submitTestController;
