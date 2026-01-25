import SetLock from "../../models/grammarDPP/SetLock.js";

// 🔹 GET lock status of a set
// GET /grammarDPP/is-locked/:set
export const getLockStatus = async (req, res) => {
  try {
    const setName = req.params.set;

    const record = await SetLock.findOne({ set: setName });

    // record nahi mila → unlocked
    if (!record) {
      return res.json({
        status: true,
        isLocked: false,
      });
    }

    return res.json({
      status: true,
      isLocked: record.isLocked,
    });
  } catch (err) {
    console.error("getLockStatus error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

// 🔹 LOCK / UNLOCK a set
// PUT /grammarDPP/toggle-lock/:set
export const toggleLock = async (req, res) => {
  try {
    const setName = req.params.set;
    const { isLocked } = req.body; // true / false

    let record = await SetLock.findOne({ set: setName });

    if (!record) {
      record = new SetLock({
        set: setName,
        isLocked: Boolean(isLocked),
      });
    } else {
      record.isLocked = Boolean(isLocked);
    }

    await record.save();

    return res.json({
      status: true,
      set: setName,
      isLocked: record.isLocked,
      message: record.isLocked ? "Exam locked" : "Exam unlocked",
    });
  } catch (err) {
    console.error("toggleLock error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
