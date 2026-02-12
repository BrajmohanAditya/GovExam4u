// card imported from database and displayed on frontend
import AddQuiz from "../../models/allSubQuiz/addQuiz.js";

const getQuiz = async (req, res, next) => {
  try {
    const cards = await AddQuiz.find({}).sort({ createdAt: 1 }).lean();

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
