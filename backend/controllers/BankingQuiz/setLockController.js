import SetLock from "../../models/allSubQuiz/SetLock.js";

// 🔹 GET lock status of a set
export const getLockStatus = async (req, res) => {
  try {
    const setName = req.params.set;

    const record = await SetLock.findOne({ set: setName }).lean();

    if (!record) {
      return res.json({ status: true, isLocked: false });
    }

    return res.json({ status: true, isLocked: Boolean(record.isLocked) });
  } catch (err) {
    console.error("getLockStatus error:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// 🔹 LOCK / UNLOCK a set
export const toggleLock = async (req, res) => {
  try {
    const setName = req.params.set;
    const { isLocked } = req.body;

    await SetLock.findOneAndUpdate(
      { set: setName },
      { isLocked: Boolean(isLocked) },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return res.json({
      status: true,
      set: setName,
      isLocked: Boolean(isLocked),
      message: isLocked ? "Exam locked" : "Exam unlocked",
    });
  } catch (err) {
    console.error("toggleLock error:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
