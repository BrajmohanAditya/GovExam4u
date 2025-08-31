// step : 4 , aim : restricting wrong data from hopscotch, work: joi ko use kr k schema likha hu
const Joi = require("joi");

module.exports.joiexamdateSchema = Joi.object({
  Exam: Joi.string().trim().min(1).required(),
  Pre: Joi.date().required(),
  Mains: Joi.date().required(),
});
//---
// http://localhost:8080/examTrack, (ish route per ager hopscotch seh bina value ka data send kiya toh add nahi hoga)
/*
{ Example 
  "Exam": " ",
  "Pre": "2025-10-05",
  "Mains": "2025-12-15"
}
*/
