import SetWinner from "../../models/BankingQuiz/SetWinner.js";

export const getAllWinners = async (req, res) => {
  try {
    const winners = await SetWinner.find({});
    return res.status(200).json({ status: true, data: winners });
  } catch (error) {
    console.error("Error in getAllWinners:", error);
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};
