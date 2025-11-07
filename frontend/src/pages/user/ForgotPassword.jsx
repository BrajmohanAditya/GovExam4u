import React, { useState } from "react";
import { TextField, Button, Input } from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { ArrowBack, Send } from "@mui/icons-material";
import { GrPowerReset } from "react-icons/gr";
import useGeneral from "../user/hooks/useGeneral";
import apis from "./utils/apisUsers";
import httpAction from "../user/utils/httpAction";
import { toast } from "react-hot-toast";
const ForgotPassword = () => {
  const initialState = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),

  });
  const { navigate } = useGeneral();

  const submitHandler = async(values) => {
    // console.log(values);
    const data = {
      url:apis().forgotPassword,
      method:"POST",
      body:{email:values.email}
    }
    const result = await httpAction(data);
    if(result?.status){
      toast.success(result?.message);
      navigate("/otpVerify");
      localStorage.setItem("email", values.email);
    }
  };

  return (
    <div className="auth_card">
      <Formik
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        initialValues={initialState}
      >
        {({ handleBlur, handleChange, values, touched, errors }) => (
          <Form>
            <div className="container_flex">
              <div className="row">
                <div className="col auth_header">
                  <GrPowerReset />
                  <p>Find your Account</p>
                  <span>enter your registered email</span>
                </div>

                <div className="col">
                  <TextField
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    label="your registered email"
                    fullWidth
                    size="small"
                  />
                </div>

                <div className="col-">
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    endIcon={<Send />}
                    onClick={() => navigate("/otpVerify")}
                  >
                    Send otp
                  </Button>
                </div>
                <div className="col">
                  <Button
                    startIcon={<ArrowBack />}
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate("/login")}
                  >
                    back to login
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};


export default ForgotPassword;
