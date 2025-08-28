//aim: Adding server side validation. 
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
//---



/*
wrapAsync ne .catch(next) lagaya hua hai → iska matlab error automatically next(err) call karega.
Aur Express ke paas jo global error handler middleware hoga (app.use((err, req, res, next)=>{...})),
usme wo error chala jayega.
*/

// WrapAsink is better version of try catch validation. 