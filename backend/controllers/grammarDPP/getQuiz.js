// card imported from database and displayed on frontend
import grammarDPPdataBase from "../../models/grammarDPP.js";
const getQuiz = async (req, res, next) => {
  try {
    const cards = await grammarDPPdataBase.find().sort({ createdAt: -1 });

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