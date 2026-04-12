import SetWinner from "../../models/SchoolQuiz/SetWinner.js";
import submittedTest from "../../models/SchoolQuiz/submittedTest.js";
import addQuiz from "../../models/SchoolQuiz/addQuiz.js";

export const declareWinner = async (req, res) => {
  try {
    const setName = req.params.setName;

    // 1. Get total number of questions for this set
    const totalMarks = await addQuiz.countDocuments({ set: setName });
    if (totalMarks === 0) {
      return res.status(404).json({
        status: false,
        message: "No questions found for this set.",
      });
    }

    const passingMarks = totalMarks * 0.4;

    // 2. Get eligible students (score > passingMarks)
    const eligibleStudents = await submittedTest.find({
      set: setName,
      score: { $gt: passingMarks },
    });

    if (!eligibleStudents || eligibleStudents.length === 0) {
      return res.status(200).json({
        status: true,
        message: "No eligible students found (Required score > 40%)",
        winner: null,
      });
    }

    // 3. Pick a random winner
    const randomIndex = Math.floor(Math.random() * eligibleStudents.length);
    const winner = eligibleStudents[randomIndex];

    // 4. Upsert the winner into the SetWinner collection
    const savedWinner = await SetWinner.findOneAndUpdate(
      { set: setName },
      {
        set: setName,
        winnerName: winner.name,
        winnerScore: winner.score,
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Winner successfully declared!",
      winner: savedWinner,
    });
  } catch (error) {
    console.error("Error in declareWinner:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getWinner = async (req, res) => {
  try {
    const setName = req.params.setName;
    const winner = await SetWinner.findOne({ set: setName });

    if (!winner) {
      return res.status(200).json({
        status: true,
        winner: null,
      });
    }

    return res.status(200).json({
      status: true,
      winner: winner,
    });
  } catch (error) {
    console.error("Error in getWinner:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
