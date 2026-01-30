import supabase from "../../utils/supabaseClient.js";

/* ================= SUBMIT / SAVE TEST ================= */
const submitTestController = async (req, res) => {
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
    const { error } = await supabase.from("all_sub_quiz_submissions").insert([
      {
        user_id: userId,
        user_name: name,
        user_email: email,
        set_name: set,
        score,
        answers, // Supabase handles JSONB
        submitted_at: new Date(),
      },
    ]);

    if (error) throw error;

    return res.json({
      status: true,
      message: "Test submitted successfully",
    });
  } catch (err) {
    // 🔥 Duplicate submission error (one user → one test)
    // Postgres error code for unique violation is 23505
    if (err.code === "23505") {
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

export default submitTestController;
