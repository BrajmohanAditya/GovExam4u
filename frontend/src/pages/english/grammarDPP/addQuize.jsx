import React from "react";
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
import apis from "./apis.js";
import httpAction from "./httpAction.js";

const AddQuize = () => {
  const navigate = useNavigate();

  // 🔹 Initial State
  const initialState = {
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

  // 🔹 Validation Schema
  const validationSchema = Yup.object({
    set: Yup.string()
      .matches(/^\d+$/, "Only numbers allowed")
      .required("Set number is required"),

    question: Yup.string().required("Question is required"),
    option1: Yup.string().required("Option 1 is required"),
    option2: Yup.string().required("Option 2 is required"),
    option3: Yup.string().required("Option 3 is required"),
    option4: Yup.string().required("Option 4 is required"),
    option5: Yup.string(),
    answer: Yup.string().required("Select correct answer"),
    explanation: Yup.string().required("Explanation is required"),
  });

  // 🔹 Submit Handler (IMPORTANT PART)
  const submitHandler = async (values, { resetForm }) => {
    // option1..option5 → options[]
    const options = [
      values.option1,
      values.option2,
      values.option3,
      values.option4,
      values.option5,
    ].filter(Boolean);

    // "option3" → 2
    const correctAnswerIndex = options.findIndex(
      (_, idx) => `option${idx + 1}` === values.answer
    );

    const payload = {
      // set: values.set,
      ...values,
      set: `Set ${values.set}`,
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
      resetForm();
      navigate("/add-Quize");
    } else {
      toast.error(result?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center m-4 px-4">
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

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Home
          </button>
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
              {/* Set Name */}

              <TextField
                name="set"
                label="Set Number"
                fullWidth
                margin="normal"
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

              {/* Question */}
              <TextField
                name="question"
                label="Question"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                value={values.question}
                onChange={(e) => setFieldValue("question", e.target.value)}
                onBlur={handleBlur}
                error={touched.question && Boolean(errors.question)}
                helperText={touched.question && errors.question}
              />

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {["option1", "option2", "option3", "option4", "option5"].map(
                  (opt, index) => (
                    <TextField
                      key={opt}
                      name={opt}
                      label={`Option ${index + 1}`}
                      fullWidth
                      value={values[opt]}
                      onChange={(e) => setFieldValue(opt, e.target.value)}
                      onBlur={handleBlur}
                      error={touched[opt] && Boolean(errors[opt])}
                      helperText={touched[opt] && errors[opt]}
                    />
                  )
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

              {/* Explanation */}
              <TextField
                name="explanation"
                label="Explanation / Solution"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={values.explanation}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("explanation", e.target.value)}
                error={touched.explanation && Boolean(errors.explanation)}
                helperText={touched.explanation && errors.explanation}
              />

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
