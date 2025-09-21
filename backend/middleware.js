const ExpressError = require("./utils/ExpressError.js");


// aim : signup  login logout  ,   work: login hai ya nhai ya check karo.
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    return res
      .status(401)
      .json({ message: "You must be logged in to do anything" });
  }
  next();
};
//---

//step:18, aim:  user jaha jaana chahta hai, login ke baad usko wahi wapas wohi send kr doh.
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
//--- work: Ye middleware session me rakhe huye redirectUrl ko locals me daal deta hai
