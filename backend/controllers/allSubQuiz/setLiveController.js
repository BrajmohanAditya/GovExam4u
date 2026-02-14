import SetLive from "../../models/allSubQuiz/SetLive.js";

// GET live status for a set
export const getLiveStatus = async (req, res) => {
  try {
    const setName = req.params.set;
    const record = await SetLive.findOne({ set: setName }).lean();

    if (!record) {
      return res.json({ status: true, isLive: false });
    }

    return res.json({ status: true, isLive: Boolean(record.isLive) });
  } catch (err) {
    console.error("getLiveStatus error:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// TOGGLE live on/off for a set
export const toggleLive = async (req, res) => {
  try {
    const setName = req.params.set;
    const { isLive } = req.body;

    await SetLive.findOneAndUpdate(
      { set: setName },
      { isLive: Boolean(isLive) },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return res.json({
      status: true,
      set: setName,
      isLive: Boolean(isLive),
      message: isLive ? "Set is now live" : "Set taken offline",
    });
  } catch (err) {
    console.error("toggleLive error:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

export default toggleLive;
