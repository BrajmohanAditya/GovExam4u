// import mongoose from "mongoose";

// const grammarDPPSchema = new mongoose.Schema(
//   {
//     set: {
//       type: String,
//       required: true, // "Set 1", "Set 2", etc.
//     },
//     question: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     option1: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     option2: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     option3: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     option4: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     option5: {
//       type: String,
//       required: true,
//       trim: true,
//     },


//     // option1 | option2 | option3 | option4 | option5
//     answer: {
//       type: String,
//       required: true,
//       enum: ["option1", "option2", "option3", "option4", "option5"],
//     },
//     explanation: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// const grammarDPPdataBase =
//   mongoose.models.grammarDPPdataBase ||
//   mongoose.model("grammarDPPdataBase", grammarDPPSchema);

// export default grammarDPPdataBase; // ✅ ES Module export
import mongoose from "mongoose";

const grammarDPPSchema = new mongoose.Schema(
  {
    // e.g. "Set 1", "Set 2"
    set: {
      type: String,
      required: true,
      trim: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ OPTIONS AS ARRAY
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length >= 2;
        },
        message: "At least two options are required",
      },
    },

    // ✅ INDEX of correct option (0-based)
    correctAnswerIndex: {
      type: Number,
      required: true,
      min: 0,
    },

    explanation: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const GrammarDPP =
  mongoose.models.GrammarDPP || mongoose.model("GrammarDPP", grammarDPPSchema);

export default GrammarDPP;
