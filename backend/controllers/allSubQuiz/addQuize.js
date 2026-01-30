import supabase from "../../utils/supabaseClient.js";

const addQuizeController = async (req, res, next) => {
  try {
    const {
      set,
      question,
      options, // ✅ ARRAY
      correctAnswerIndex, // ✅ NUMBER
      explanation,
    } = req.body;

    // 🔹 Backend validation
    if (
      !set ||
      !question ||
      !Array.isArray(options) ||
      options.length < 2 ||
      correctAnswerIndex === undefined ||
      explanation === undefined
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid quiz data",
      });
    }

    // 🔹 validate correctAnswerIndex range
    if (correctAnswerIndex < 0 || correctAnswerIndex >= options.length) {
      return res.status(400).json({
        status: false,
        message: "Correct answer index is out of range",
      });
    }

    // 🔹 Create new quiz question
    const { data: newQuestion, error } = await supabase
      .from("all_sub_quiz_questions")
      .insert([
        {
          set_name: set, // Mapping 'set' to 'set_name' column
          question,
          options,
          correct_answer_index: correctAnswerIndex,
          explanation,
        },
      ])
      .select();

    if (error) throw error;

    return res.status(201).json({
      status: true,
      message: "Question added successfully",
      data: newQuestion[0],
    });
  } catch (error) {
    next(error);
  }
};

export default addQuizeController;
