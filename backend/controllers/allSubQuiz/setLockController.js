import supabase from "../../utils/supabaseClient.js";

// 🔹 GET lock status of a set
// GET /allSubQuiz/is-locked/:set
export const getLockStatus = async (req, res) => {
  try {
    const setName = req.params.set;

    const { data: record, error } = await supabase
      .from("all_sub_quiz_set_locks")
      .select("is_locked")
      .eq("set_name", setName)
      .single();

    // record nahi mila → unlocked
    if (error || !record) {
      return res.json({
        status: true,
        isLocked: false,
      });
    }

    return res.json({
      status: true,
      isLocked: record.is_locked,
    });
  } catch (err) {
    console.error("getLockStatus error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

// 🔹 LOCK / UNLOCK a set
// PUT /grammarDPP/toggle-lock/:set
export const toggleLock = async (req, res) => {
  try {
    const setName = req.params.set;
    const { isLocked } = req.body; // true / false

    const { error } = await supabase
      .from("all_sub_quiz_set_locks")
      .upsert(
        { set_name: setName, is_locked: Boolean(isLocked) },
        { onConflict: "set_name" },
      );

    if (error) throw error;

    return res.json({
      status: true,
      set: setName,
      isLocked: Boolean(isLocked),
      message: isLocked ? "Exam locked" : "Exam unlocked",
    });
  } catch (err) {
    console.error("toggleLock error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
