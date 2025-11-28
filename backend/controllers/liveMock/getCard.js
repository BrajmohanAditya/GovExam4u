// card imported from database and displayed on frontend
import livemockdb from "../../models/liveMock.js";

const getCards = async (req, res, next) => {
  try {
    const cards = await livemockdb.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "All mock cards fetched",
      data: cards,
    });
  } catch (error) {
    next(error);
  }
};

export default getCards;
