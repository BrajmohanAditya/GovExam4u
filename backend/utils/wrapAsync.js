//aim: Adding server side validation. use wrapAsync to get rid of try and catch
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
//---



/*
wrapAsync ka kaam alag hai — ye async route handlers ke andar jo bhi error aaye, 
unko catch karke global error handler tak pahunchana. ish tarah seh sever crash nahi hoga 
*/

// WrapAsink is better version of try catch validation. 