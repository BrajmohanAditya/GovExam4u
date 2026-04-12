// card imported from database and displayed on frontend
import AddQuiz from "../../models/SchoolQuiz/addQuiz.js";

const getQuiz = async (req, res, next) => {
  try {
    const { studentClass } = req.query;
    const filter = studentClass ? { studentClass } : {};
    
    const cards = await AddQuiz.find(filter).sort({ createdAt: 1 }).lean();

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
