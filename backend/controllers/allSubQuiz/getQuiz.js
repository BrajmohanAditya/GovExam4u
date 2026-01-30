// card imported from database and displayed on frontend
import supabase from "../../utils/supabaseClient.js";

const getQuiz = async (req, res, next) => {
  try {
    const { data: cards, error } = await supabase
      .from("all_sub_quiz_questions")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;

    return res.status(200).json({
      status: true,
      message: "All Quiz fetched successfully",
      data: cards,
    });
  } catch (error) {
    next(error);
  }
};

export default getQuiz;
