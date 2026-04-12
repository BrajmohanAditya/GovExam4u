import AddQuiz from "../../models/SchoolQuiz/addQuiz.js";

const addQuizeController = async (req, res, next) => {
  try {
    const {
      studentClass,
      subject,
      set,
      passage,
      question,
      options, // ✅ ARRAY
      correctAnswerIndex, // ✅ NUMBER
      explanation,
    } = req.body;

    // 🔹 Backend validation
    if (
      !subject ||
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

    // create via mongoose
    const newQuestion = await AddQuiz.create({
      studentClass,
      subject,
      set,
      passage,
      question,
      options,
      correctAnswerIndex,
      explanation,
    });

    return res
      .status(201)
      .json({
        status: true,
        message: "Question added successfully",
        data: newQuestion,
      });
  } catch (error) {
    next(error);
  }
};

export default addQuizeController;
