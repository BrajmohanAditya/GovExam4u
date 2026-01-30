import supabase from "../../utils/supabaseClient.js";

export const getAllLockStatus = async (req, res) => {
  try {
    const { data: locks, error } = await supabase
      .from("all_sub_quiz_set_locks")
      .select("set_name, is_locked");

    if (error) throw error;

    // Map set_name back to set for frontend compatibility
    const formattedLocks = locks.map((lock) => ({
      set: lock.set_name,
      isLocked: lock.is_locked,
    }));

    return res.json({
      status: true,
      data: formattedLocks,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch lock status",
    });
  }
};

export default getAllLockStatus;
