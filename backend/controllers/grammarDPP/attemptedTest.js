import attemptedTest from "../../models/grammarDPP/attemptedTest.js";

/* ================= SUBMIT / SAVE TEST ================= */
const submitTest = async (req, res) => {
  try {
    // 🔐 Logged-in user id (JWT middleware se)
    const userId = req.user._id;
    const { name, email } = req.user;
    // 📦 Frontend se data
    const { set, score, answers } = req.body;

    // 🛑 Basic validation
    if (!set) {
      return res.status(400).json({
        status: false,
        message: "Set is required",
      });
    }

    // ✅ SAVE ATTEMPT (DB unique index handles duplicates)
    await attemptedTest.create({
      userId,
      name,
      email,
      set,
      score,
      answers,
      submittedAt: new Date(),
    });

    return res.json({
      status: true,
      message: "Test submitted successfully",
    });
  } catch (err) {
    // 🔥 Duplicate submission error (one user → one test)
    if (err.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Test already submitted",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export default submitTest;
