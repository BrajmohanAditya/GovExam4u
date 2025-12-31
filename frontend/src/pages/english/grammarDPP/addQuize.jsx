import React from "react";
import { Formik, Form } from "formik";
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
import apis from "./apis.js"
import  httpAction  from "./httpAction.js";

const AddQuize = () => {
  const navigate = useNavigate();

  const initialState = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
    answer: "",
  };

  const validationSchema = Yup.object({
    question: Yup.string().required("Question is required"),
    option1: Yup.string().required("Option 1 is required"),
    option2: Yup.string().required("Option 2 is required"),
    option3: Yup.string().required("Option 3 is required"),
    option4: Yup.string().required("Option 4 is required"),
    option5: Yup.string(),
    answer: Yup.string().required("Select correct answer"),
  });

  const submitHandler = async (values) => {
    const data = {
      url: apis().addQuize,
      method: "POST",
      body: values,
    };

    const result = await httpAction(data);

    if (result?.status) {
      toast.success(result.message || "Question added");
      navigate("/livemock");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    // 🌟 FULL PAGE WRAPPER
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      {/* 🌟 CARD */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Add New MCQ
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Create questions for live mock / practice set
        </p>

        <Divider />

        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {({ handleChange, handleBlur, touched, errors }) => (
            <Form className="mt-6">
              {/* Question */}
              <TextField
                name="question"
                label="Question"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.question && Boolean(errors.question)}
                helperText={touched.question && errors.question}
              />

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {["option1", "option2", "option3", "option4", "option5"].map(
                  (opt, index) => (
                    <TextField
                      key={opt}
                      name={opt}
                      label={`Option ${index + 1}`}
                      fullWidth
                      onChange={handleChange}
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
