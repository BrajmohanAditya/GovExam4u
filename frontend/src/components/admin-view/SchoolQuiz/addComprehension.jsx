import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { InputAdornment, TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel, Divider, IconButton } from "@mui/material";
import { Trash2, PlusCircle } from "lucide-react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apis from "../../../apis/schoolQuizApi.js";
import httpAction from "../../../services/httpAction.js";
import RichTextEditor from "../../BankingQuiz/RichTextEditor.jsx";

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
};

const emptyQuestion = {
  question: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  option5: "",
  answer: "",
  explanation: "",
};

const AddComprehension = () => {
  const navigate = useNavigate();

  const initialState = {
    studentClass: "6",
    subject: "English",
    set: "",
    passage: "",
    questions: [{ ...emptyQuestion }],
  };

  const validationSchema = Yup.object().shape({
    studentClass: Yup.string().required("Class is required"),
    subject: Yup.string().required("Subject is required"),
    set: Yup.string()
      .matches(/^\d+$/, "Only numbers allowed")
      .required("Set number is required"),
    passage: Yup.string()
      .test(
        "not-empty-html",
        "Passage is required",
        (value) => stripHtml(value).length > 0
      )
      .required("Passage is required"),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          question: Yup.string()
            .test("not-empty", "Required", (val) => stripHtml(val).length > 0)
            .required("Question is required"),
          option1: Yup.string()
            .test("not-empty", "Required", (val) => stripHtml(val).length > 0)
            .required("Option 1 is required"),
          option2: Yup.string()
            .test("not-empty", "Required", (val) => stripHtml(val).length > 0)
            .required("Option 2 is required"),
          option3: Yup.string()
            .test("not-empty", "Required", (val) => stripHtml(val).length > 0)
            .required("Option 3 is required"),
          option4: Yup.string()
            .test("not-empty", "Required", (val) => stripHtml(val).length > 0)
            .required("Option 4 is required"),
          option5: Yup.string(),
          answer: Yup.string().required("Select correct answer"),
          explanation: Yup.string(),
        })
      )
      .min(1, "At least one question is required"),
  });

  const submitHandler = async (values, { resetForm, setSubmitting }) => {
    let successCount = 0;

    // Loop through each question and add them to the database
    for (let i = 0; i < values.questions.length; i++) {
      const q = values.questions[i];

      const options = [
        q.option1,
        q.option2,
        q.option3,
        q.option4,
        q.option5,
      ].filter(Boolean);

      const correctAnswerIndex = options.findIndex(
        (_, idx) => `option${idx + 1}` === q.answer
      );

      const payload = {
        studentClass: values.studentClass,
        subject: values.subject,
        set: `Class ${values.studentClass} - ${values.subject} - Set ${values.set}`,
        passage: values.passage, // Bind the same passage to every question
        question: q.question,
        options,
        correctAnswerIndex,
        explanation: q.explanation,
      };

      const data = {
        url: apis().addQuize,
        method: "POST",
        body: payload,
      };

      const result = await httpAction(data);
      if (result?.status) {
        successCount++;
      }
    }

    setSubmitting(false);

    if (successCount === values.questions.length) {
      toast.success(`Successfully saved ${successCount} questions!`);
      resetForm({
        values: {
          ...initialState,
          studentClass: values.studentClass,
          subject: values.subject,
          set: values.set,
        },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (successCount > 0) {
      toast.error(`Only saved ${successCount} out of ${values.questions.length} questions. Please check network.`);
    } else {
      toast.error("Failed to add questions. Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 flex py-10 justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Add Reading Comprehension
          </h2>
          <p className="text-gray-500 mt-1">
            Create a single passage and attach multiple questions to it.
          </p>
        </div>


        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {({
            handleChange,
            handleBlur,
            touched,
            errors,
            values,
            setFieldValue,
            isSubmitting
          }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Class Selection */}
                <TextField
                  select
                  name="studentClass"
                  label="Class"
                  fullWidth
                  value={values.studentClass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.studentClass && Boolean(errors.studentClass)}
                  helperText={touched.studentClass && errors.studentClass}
                  slotProps={{ select: { native: true } }}
                >
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                </TextField>

                <TextField
                  select
                  name="subject"
                  label="Subject"
                  fullWidth
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.subject && Boolean(errors.subject)}
                  helperText={touched.subject && errors.subject}
                  slotProps={{ select: { native: true } }}
                >
                  <option value="English">English</option>
                  <option value="Quant">Quant</option>
                  <option value="Reasoning">Reasoning</option>
                  <option value="Current Affairs">Current Affairs</option>
                  <option value="Computer">Computer</option>
                </TextField>

                <TextField
                  name="set"
                  label="Set Number"
                  fullWidth
                  value={values.set}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.set && Boolean(errors.set)}
                  helperText={touched.set && errors.set}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Set</InputAdornment>,
                  }}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </div>

              {/* Passage Section */}
              <div className="mb-8 p-6 bg-blue-50/50 rounded-xl border border-blue-100 shadow-inner">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Reading Passage</h3>
                <RichTextEditor
                  value={values.passage}
                  onChange={(content) => setFieldValue("passage", content)}
                  placeholder="Enter the entire reading comprehension passage here..."
                  height="300px"
                />
                {touched.passage && typeof errors.passage === 'string' && (
                  <p className="text-red-500 text-sm mt-2 font-medium">{errors.passage}</p>
                )}
              </div>

              <Divider className="mb-8" />

              {/* Dynamic Questions List */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Questions Attached ({values.questions.length})</h3>
                </div>

                <FieldArray name="questions">
                  {({ push, remove }) => (
                    <div className="space-y-8">
                      {values.questions.map((q, index) => {
                        const questionPrefix = `questions.${index}`;
                        const qErrors = (errors.questions && errors.questions[index]) || {};
                        const qTouched = (touched.questions && touched.questions[index]) || {};

                        return (
                          <div key={index} className="relative p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="absolute top-4 right-4 flex gap-2">
                              {values.questions.length > 1 && (
                                <IconButton
                                  onClick={() => remove(index)}
                                  color="error"
                                  size="small"
                                  title="Remove Question"
                                >
                                  <Trash2 size={20} />
                                </IconButton>
                              )}
                            </div>

                            <h4 className="font-semibold text-gray-700 mb-4 bg-gray-100 inline-block px-3 py-1 rounded-full text-sm">Question {index + 1}</h4>

                            <div className="mb-5">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Question Text *</label>
                              <RichTextEditor
                                value={q.question}
                                onChange={(content) => setFieldValue(`${questionPrefix}.question`, content)}
                                placeholder="Enter your question here..."
                              />
                              {qTouched.question && qErrors.question && (
                                <p className="text-red-500 text-xs mt-1">{qErrors.question}</p>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                              {["option1", "option2", "option3", "option4", "option5"].map((optStr, optIdx) => (
                                <div key={optStr}>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Option {optIdx + 1} {optIdx < 4 && "*"}
                                  </label>
                                  <RichTextEditor
                                    value={q[optStr]}
                                    onChange={(content) => setFieldValue(`${questionPrefix}.${optStr}`, content)}
                                    placeholder={`Option ${optIdx + 1}...`}
                                    height="100px" // Using smaller height for options if component supports it, otherwise default.
                                  />
                                  {qTouched[optStr] && qErrors[optStr] && (
                                    <p className="text-red-500 text-xs mt-1">{qErrors[optStr]}</p>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="mb-5 p-4 rounded-lg bg-indigo-50/50 border border-indigo-100">
                              <FormLabel className="font-medium text-indigo-900">Correct Answer</FormLabel>
                              <RadioGroup
                                name={`${questionPrefix}.answer`}
                                row
                                className="mt-2"
                                value={q.answer}
                                onChange={handleChange}
                              >
                                {["option1", "option2", "option3", "option4", "option5"].map((o, idx) => (
                                  <FormControlLabel
                                    key={o}
                                    value={o}
                                    control={<Radio size="small" />}
                                    label={`Opt ${idx + 1}`}
                                    className="mr-4"
                                  />
                                ))}
                              </RadioGroup>
                              {qTouched.answer && qErrors.answer && (
                                <p className="text-red-500 text-sm mt-1">{qErrors.answer}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Explanation (Optional)</label>
                              <RichTextEditor
                                value={q.explanation}
                                onChange={(content) => setFieldValue(`${questionPrefix}.explanation`, content)}
                                placeholder="Enter explanation here..."
                              />
                            </div>
                          </div>
                        );
                      })}

                      <div className="flex justify-center mt-6">
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<PlusCircle />}
                          onClick={() => push({ ...emptyQuestion })}
                          className="border-dashed border-2 py-2 px-6 rounded-lg font-semibold"
                        >
                          Add Another Question
                        </Button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>

              <Divider className="mb-6" />

              <div className="flex justify-end mt-6">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  size="large"
                  color="success"
                  sx={{
                    px: 6,
                    py: 1.5,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1.05rem"
                  }}
                >
                  {isSubmitting ? "Saving All Questions..." : `Save Complete Comprehension (${values.questions.length})`}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddComprehension;
