import SetLock from "../../models/allSubQuiz/SetLock.js";

export const getAllLockStatus = async (req, res) => {
  try {
    const locks = await SetLock.find({}).lean();

    const formattedLocks = locks.map((lock) => ({
      set: lock.set,
      isLocked: lock.isLocked,
    }));

    return res.json({ status: true, data: formattedLocks });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Failed to fetch lock status" });
  }
};

export default getAllLockStatus;
