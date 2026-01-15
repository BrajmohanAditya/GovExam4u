import SetLock from "../../models/grammarDPP/SetLock.js";


export const getAllLockStatus = async (req, res) => {
  try {
    const locks = await SetLock.find({}, { set: 1, isLocked: 1, _id: 0 });
    return res.json({
      status: true,
      data: locks,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch lock status",
    });
  }
};
