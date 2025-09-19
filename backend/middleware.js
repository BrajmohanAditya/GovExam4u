// middlemalwere for authentication and authorization
const ExpressError = require("./utils/ExpressError.js");

//middlemalwere use it anywhere to authenticate ki user login hai ki nahi if no then usko add listing  krna mt doh.
module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; //step:18, work: Ye line ek bookmark banati hai ki user kahaan jaana chahta tha, taaki login ke baad usko wahi wapas bhej sakein.
    req.flash("error", "You must be loged in to do any thing");
    return res.redirect("/login");
  }
  next();
};
//*the moment you hit a url it generate, req,  (req) k ander sara detail hota hai, like path wagera(req.originalUrl). 
//---


//step:18, aim:  user jaha jaana chahta hai, login ke baad usko wahi wapas wohi send kr doh. 
module.exports.saveRedirectUrl = (req, res, next) =>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
//--- work: Ye middleware session me rakhe huye redirectUrl ko locals me daal deta hai






