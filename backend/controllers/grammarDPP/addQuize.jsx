// code to save a new quiz question to the database
import grammarDPPdataBase from "../../models/grammarDPP.js";
const addQuiz = async (req, res, next) => {
  try {
    const { question, option1, option2, option3, option4, option5, answer } =
      req.body;

    // 🔹 backend validation
    if (!question || !option1 || !option2 || !option3 || !option4 || !answer) {
      return res.status(400).json({
        status: false,
        message: "All required fields must be filled",
      });
    }

    // 🔹 create new quiz question
    const newQuestion = await grammarDPPdataBase.create({
      question,
      option1,
      option2,
      option3,
      option4,
      option5,
      answer,
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
