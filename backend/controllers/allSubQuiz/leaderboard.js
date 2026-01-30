// controllers/grammarDPP/leaderboard.js
import supabase from "../../utils/supabaseClient.js";

const leaderboard = async (req, res) => {
  try {
    const { set } = req.body;

    if (!set) {
      return res.status(400).json({
        status: false,
        message: "Set is required",
      });
    }

    const { data: results, error } = await supabase
      .from("all_sub_quiz_submissions")
      .select("user_name, score, user_id")
      .eq("set_name", set)
      .order("score", { ascending: false });

    if (error) throw error;

    // Map fields back to frontend expectations
    const formattedResults = results.map((r) => ({
      name: r.user_name,
      score: r.score,
      userId: r.user_id,
    }));

    return res.json({
      status: true,
      data: formattedResults,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export default leaderboard;
