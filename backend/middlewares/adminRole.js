// Super admin role middleware
const adminRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: false,
        message: "unauthorized user - admin role required",
      });
    }
    next();
  };
};

export default  adminRoles ;