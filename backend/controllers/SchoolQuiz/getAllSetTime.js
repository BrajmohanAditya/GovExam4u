import SetTime from "../../models/SchoolQuiz/SetTime.js";

export const getAllSetTimes = async (req, res) => {
  try {
    const records = await SetTime.find({}).lean();
    return res.json({ status: true, data: records });
  } catch (err) {
    console.error("getAllSetTimes error:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
