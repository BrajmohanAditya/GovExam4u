// code to save a new live mock card to the database
import livemockdb from "../../models/liveMock.js";

const addCard = async (req, res, next) => {
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
    const newMock = await livemockdb.create({
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

export default addCard;
