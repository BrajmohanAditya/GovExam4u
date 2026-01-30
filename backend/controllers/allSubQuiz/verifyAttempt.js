import supabase from "../../utils/supabaseClient.js";

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

    const { data: attempt, error } = await supabase
      .from("all_sub_quiz_submissions")
      .select("*")
      .eq("user_id", userId)
      .eq("set_name", set)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is 'not found' which is fine here
      throw error;
    }

    return res.json({
      status: true,
      attempted: !!attempt,
      score: attempt?.score ?? null, // optional
      name: attempt?.user_name,
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
