import SetLive from "../../models/allSubQuiz/SetLive.js";

export const getAllLiveStatus = async (req, res) => {
  try {
    const lives = await SetLive.find({}).lean();

    const formatted = lives.map((l) => ({ set: l.set, isLive: l.isLive }));

    return res.json({ status: true, data: formatted });
  } catch (err) {
    console.error("getAllLiveStatus error:", err);
    return res
      .status(500)
      .json({ status: false, message: "Failed to fetch live status" });
  }
};

export default getAllLiveStatus;
