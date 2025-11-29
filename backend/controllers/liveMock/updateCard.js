import livemockdb from "../../models/liveMock.js";

const updateCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, exam, link, date } = req.body;

    if (!name || !exam || !link || !date) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const updated = await livemockdb.findByIdAndUpdate(
      id,
      { name, exam, link, date },
      { new: true, runValidators: true } // important
    );

    if (!updated) {
      return res.status(404).json({
        status: false,
        message: "Card not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Card Updated Successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

export default updateCard;
