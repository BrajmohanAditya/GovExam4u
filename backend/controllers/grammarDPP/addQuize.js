// code to save a new quiz question to the database
// code to save a new quiz question to the database
import grammarDPPdataBase from "../../models/grammarDPP.js";

const addQuiz = async (req, res, next) => {
  try {
    const {
      set,            // ✅ NEW
      question,
      option1,
      option2,
      option3,
      option4,
      option5,
      answer,
      explanation,
    } = req.body;

    // 🔹 backend validation
    if (
      !set ||          // ✅ validate set
      !question ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !answer ||
      !explanation
    ) {
      return res.status(400).json({
        status: false,
        message: "Set, question and all required options must be filled",
      });
    }

    // 🔹 create new quiz question
    const newQuestion = await grammarDPPdataBase.create({
      set,            // ✅ save set
      question,
      option1,
      option2,
      option3,
      option4,
      option5,
      answer,
      explanation,
    });

    return res.status(201).json({
      status: true,
      message: "Question Added Successfully",
      data: newQuestion,
    });
  } catch (error) {
    next(error);
  }
};

export default addQuiz;
