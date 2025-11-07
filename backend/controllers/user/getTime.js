import User from "../../models/user.js";

const getTime = async (req, res, next) => {
    const { email } = req.body;
    try {
        const findedUser = await User.findOne({ email: email });
        if (!findedUser) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        const time = findedUser?.password_otp?.send_time || null;
        res.status(200).json({ message:'otp sent', status:true, time});
    } catch (error) {
        next(error);
    }
}

export default getTime;