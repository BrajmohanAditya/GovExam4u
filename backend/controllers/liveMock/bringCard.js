import livemockdb from "../../models/liveMock.js";

const bringCard = async (req, res, next) => {
  try {
    const { id } = req.params; // get id from url which have trigerred bringCard component

    const card = await livemockdb.findById(id);

    if (!card) {
      return res.status(404).json({
        status: false,
        message: "Card not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Card fetched successfully",
      data: card,
    });
  } catch (error) {
    next(error);
  }
};
export default bringCard;
