import livemockdb from "../../models/liveMock.js";

const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCard = await livemockdb.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({
        status: false,
        message: "Card not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteCard;
