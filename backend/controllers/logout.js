const logout = (req, res, next) => {
    res.clearCookie("connect.sid");
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out successfully", status: true });
}
export default logout;