import User from "../../models/user.js";
import bcrypt from "bcryptjs";

const updatePassword = async (req, res, next) => {
    const {password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const findedUser = await User.findOne({email: req.email});
        findedUser.password = hashedPassword;
        await findedUser.save();
        res.clearCookie("accessToken");
        res.clearCookie("connect.sid");
        res.status(200).json({message: "Password updated successfully", status: true});
    }catch (error) {
        next(error);
    }
}
export default updatePassword;


