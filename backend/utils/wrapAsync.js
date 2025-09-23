//aim: wrapAsync- Adding server side validation.
// module.exports = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };
//---

// utils/wrapAsync.js
const wrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default wrapAsync; // ✅ ESM default export


/*
wrapAsync ka kaam alag hai — ye async route handlers ke andar jo bhi error aaye, 
unko catch karke global error handler tak pahunchana. ish tarah seh sever crash nahi hoga 
*/

// WrapAsink is better version of try catch validation. 