import AddQuiz from "../../models/BankingQuiz/addQuiz.js";
import SetLive from "../../models/BankingQuiz/SetLive.js";
import SetLock from "../../models/BankingQuiz/SetLock.js";
import SetWinner from "../../models/BankingQuiz/SetWinner.js";
import SetTime from "../../models/BankingQuiz/SetTime.js";
import SubmittedTest from "../../models/BankingQuiz/submittedTest.js";

// 🔹 DELETE all data related to a set
export const deleteSet = async (req, res) => {
  try {
    const setName = req.params.setName;

    if (!setName) {
      return res.status(400).json({ status: false, message: "Set name is required" });
    }

    // Delete questions
    const questionDeleteResult = await AddQuiz.deleteMany({ set: setName });
    
    // Delete associated settings/status
    await SetLive.deleteOne({ set: setName });
    await SetLock.deleteOne({ set: setName });
    await SetWinner.deleteOne({ set: setName });
    await SetTime.deleteOne({ set: setName });
    await SubmittedTest.deleteMany({ set: setName });

    return res.json({
      status: true,
      message: `Set '${setName}' and its ${questionDeleteResult.deletedCount} questions have been deleted successfully.`,
    });
  } catch (err) {
    console.error("deleteSet error:", err);
    return res.status(500).json({ status: false, message: "Server error during deletion" });
  }
};
