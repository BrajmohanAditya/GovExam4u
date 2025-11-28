import LiveMock from "../../models/liveMock.js";

const AddCard = async (req, res, next) => {
  try {
    const { name, exam, link, date } = req.body;

    // backend validation
    if (!name || !exam || !link || !date) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // create new mock card
    const newMock = await LiveMock.create({
      name,
      exam,
      link,
      date,
    });

    return res.status(201).json({
      status: true,
      message: "Mock Card Added Successfully",
      data: newMock,
    });
  } catch (error) {
    next(error);
  }
};

export default AddCard;
