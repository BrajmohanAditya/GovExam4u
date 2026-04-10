import SetTime from "../../models/BankingQuiz/SetTime.js";

// 🔹 GET duration of a set
export const getSetTime = async (req, res) => {
  try {
    const setName = req.params.set;

    const record = await SetTime.findOne({ set: setName }).lean();

    if (!record) {
      return res.json({ status: true, duration: 10 });
    }

    return res.json({ status: true, duration: record.duration });
  } catch (err) {
    console.error("getSetTime error:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// 🔹 UPDATE duration a set
export const updateSetTime = async (req, res) => {
  try {
    const setName = req.params.set;
    const { duration } = req.body;

    if (!duration || isNaN(duration)) {
        return res.status(400).json({ status: false, message: "Valid duration is required" });
    }

    await SetTime.findOneAndUpdate(
      { set: setName },
      { duration: Number(duration) },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return res.json({
      status: true,
      set: setName,
      duration: Number(duration),
      message: "Time updated successfully",
    });
  } catch (err) {
    console.error("updateSetTime error:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
