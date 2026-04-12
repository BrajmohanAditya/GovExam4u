"use client";
import { Formik, Form } from "formik";
import { InputAdornment } from "@mui/material";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Divider,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apis from "../../../apis/schoolQuizApi.js";
import httpAction from "../../../services/httpAction.js";
import RichTextEditor from "../../BankingQuiz/RichTextEditor.jsx";

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
};

const AddQuize = () => {
  const navigate = useNavigate();

  const initialState = {
    subject: "English", // default value
    set: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
    answer: "",
    explanation: "",
  };

  const validationSchema = Yup.object({
    subject: Yup.string().required("Subject is required"),
    set: Yup.string()
      .matches(/^\d+$/, "Only numbers allowed")
      .required("Set number is required"),
    question: Yup.string()
      .test(
        "not-empty-html",
        "Question is required",
        (value) => stripHtml(value).length > 0,
      )
      .required("Question is required"),
    option1: Yup.string()
      .test(
        "not-empty-html",
        "Option 1 is required",
        (value) => stripHtml(value).length > 0,
      )
      .required("Option 1 is required"),
    option2: Yup.string()
      .test(
        "not-empty-html",
        "Option 2 is required",
        (value) => stripHtml(value).length > 0,
      )
      .required("Option 2 is required"),
    option3: Yup.string()
      .test(
        "not-empty-html",
        "Option 3 is required",
        (value) => stripHtml(value).length > 0,
      )
      .required("Option 3 is required"),
    option4: Yup.string()
      .test(
        "not-empty-html",
        "Option 4 is required",
        (value) => stripHtml(value).length > 0,
      )
      .required("Option 4 is required"),
    option5: Yup.string(),
    answer: Yup.string().required("Select correct answer"),
    explanation: Yup.string(),
  });

  const submitHandler = async (values, { resetForm }) => {
    const options = [
      values.option1,
      values.option2,
      values.option3,
      values.option4,
      values.option5,
    ].filter(Boolean);

    const correctAnswerIndex = options.findIndex(
      (_, idx) => `option${idx + 1}` === values.answer,
    );

    const payload = {
      ...values,
      set: `${values.subject} - Set ${values.set}`,
      question: values.question,
      options,
      correctAnswerIndex,
      explanation: values.explanation,
    };

    const data = {
      url: apis().addQuize,
      method: "POST",
      body: payload,
    };
    const result = await httpAction(data);

    if (result?.status) {
      toast.success("Question added successfully");
      // Reset the form but keep the current subject and set values
      resetForm({
        values: {
          ...initialState,
          subject: values.subject,
          set: values.set,
        },
      });
      navigate("/admin/schoolQuiz/add-Quize");
    } else {
      toast.error(result?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center m-4 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Add New MCQ
            </h2>
            <p className="text-sm text-gray-500">
              Add questions under any custom set name
            </p>
          </div>
        </div>

        <Divider />

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
          }) => (
            <Form className="mt-6">
              {/* Header Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Subject Selection */}
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

                {/* Set Number */}
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
                    startAdornment: (
                      <InputAdornment position="start">Set</InputAdornment>
                    ),
                  }}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <RichTextEditor
                  value={values.question}
                  onChange={(content) => setFieldValue("question", content)}
                  placeholder="Enter your question here..."
                  error={touched.question && errors.question}
                />
                {touched.question && errors.question && (
                  <p className="text-red-500 text-xs mt-1">{errors.question}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {["option1", "option2", "option3", "option4", "option5"].map(
                  (opt, index) => (
                    <div key={opt}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Option {index + 1} {index < 4 && "*"}
                      </label>
                      <RichTextEditor
                        value={values[opt]}
                        onChange={(content) => setFieldValue(opt, content)}
                        placeholder={`Enter option ${index + 1}...`}
                        error={touched[opt] && errors[opt]}
                      />
                      {touched[opt] && errors[opt] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[opt]}
                        </p>
                      )}
                    </div>
                  ),
                )}
              </div>

              {/* Correct Answer */}
              <div className="mt-6 p-4 rounded-lg bg-gray-50 border">
                <FormLabel className="font-medium text-gray-700">
                  Correct Answer
                </FormLabel>

                <RadioGroup
                  name="answer"
                  row
                  className="mt-2"
                  value={values.answer}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="option1"
                    control={<Radio />}
                    label="Option 1"
                  />
                  <FormControlLabel
                    value="option2"
                    control={<Radio />}
                    label="Option 2"
                  />
                  <FormControlLabel
                    value="option3"
                    control={<Radio />}
                    label="Option 3"
                  />
                  <FormControlLabel
                    value="option4"
                    control={<Radio />}
                    label="Option 4"
                  />
                  <FormControlLabel
                    value="option5"
                    control={<Radio />}
                    label="Option 5"
                  />
                </RadioGroup>

                {touched.answer && errors.answer && (
                  <p className="text-red-500 text-sm mt-1">{errors.answer}</p>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Explanation / Solution
                </label>
                <RichTextEditor
                  value={values.explanation}
                  onChange={(content) => setFieldValue("explanation", content)}
                  placeholder="Enter explanation here..."
                  error={touched.explanation && errors.explanation}
                />
                {touched.explanation && errors.explanation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.explanation}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end mt-6">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.2,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Save Question
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddQuize;
