// adding new card to database

import React from "react";
import { AddCardStyle } from "./style";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Input } from "@mui/material";
import httpAction from "../user/utils/httpAction";
import apis from "./apis.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCard = () => {
  const navigate = useNavigate();
  const initialState = {
    // this create a object in which we store form data,  values={name: ""  }
    name: "",
    date: "",
    exam: "",
    link: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("required"),
    date: Yup.string().required("required"),
    exam: Yup.string().required("required"),
    link: Yup.string().required("required"),
  });

  const submitHandler = async (values) => {
    // console.log(values);
    const data = {
      url: apis().addCard,
      method: "POST",
      body: values,
    };
    const result = await httpAction(data);
    if (result?.status) {
      toast.success(result?.message);
      navigate("/livemock");
    }
  };

  return (
    <div className={AddCardStyle.mock_card}>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ handleChange, handleBlur, touched, errors }) => (
          <Form>
            <div className={AddCardStyle.row}>
              <h3 className={AddCardStyle.h3}>Update Today Live Mock</h3>

              <TextField
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                label="Portal Name"
                fullWidth
                size="small"
              />

              <TextField
                name="exam"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.exam && Boolean(errors.exam)}
                helperText={touched.exam && errors.exam}
                label="Exam Name"
                fullWidth
                size="small"
              />

              <TextField
                name="link"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.link && Boolean(errors.link)}
                helperText={touched.link && errors.link}
                label="exam Link"
                fullWidth
                size="small"
              />

              <div className={AddCardStyle.col}>
                <TextField
                  name="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                  label="Last Date"
                  fullWidth
                  size="small"
                />
              </div>

              <div className="flex justify-center">
                <Button variant="contained" type="submit">
                  Add Mock Card
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCard;
