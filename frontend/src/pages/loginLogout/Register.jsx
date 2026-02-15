import React, { useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { TextField, Button, Input } from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { InputAdornment, IconButton, Divider } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import useGeneral from "./hooks/useGeneral";
import apis from "./utils/apisUsers";
import httpAction from "./utils/httpAction";
import { toast } from "react-hot-toast";

import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const [visible, setVisible] = useState(false);

  const visibleHandler = () => {
    setVisible(!visible);
  };
  const { navigate } = useGeneral();

  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const submitHandler = async (values) => {
    // Instead of immediately registering, send OTP for verification
    const data = {
      url: apis().registerSendOtp,
      method: "POST",
      body: values,
    };
    const result = await httpAction(data);
    if (result?.status) {
      // store registration payload temporarily until OTP verification
      localStorage.setItem("registerFlow", "true");
      localStorage.setItem("registerPayload", JSON.stringify(values));
      toast.success("OTP sent to your email. Please verify.");
      navigate("/otpVerify");
    }
  };

  const loginWithGoogle = () => {
    // isko continue with google button me lagana hai
    window.open("https://api.govexam4u.com/auth/google", "_self");
    // window.open("http://localhost:8080/auth/google", "_self");
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
                  <IoPersonAdd />
                  <p>Register New Account</p>
                  <span>signup to continue</span>
                </div>
                <Button
                  onClick={loginWithGoogle}
                  variant="outlined"
                  fullWidth
                  startIcon={<FcGoogle />}
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#1a73e8",
                    borderColor: "#dadce0",
                    fontWeight: "bold",
                    textTransform: "none",
                    letterSpacing: "0.3px",
                    py: "8px",
                    "&:hover": {
                      backgroundColor: "#f8f9fa",
                      borderColor: "#1a73e8",
                      boxShadow: "0 2px 6px rgba(26,115,232,0.2)",
                    },
                  }}
                >
                  Continue with Google
                </Button>
                <div className="col">
                  <Divider>OR</Divider>
                </div>
                <div className="col">
                  <TextField
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    label="your name"
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="col">
                  <TextField
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    label="your email"
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="col">
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton onClick={visibleHandler} edge="end">
                            {visible ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    type={visible ? "text" : "password"}
                    name="password"
                    label="your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="col">
                  <Button variant="contained" fullWidth type="submit">
                    Register
                  </Button>
                </div>
                <div className="col">
                  <Button
                    startIcon={<ArrowBack />}
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate("/login")}
                  >
                    Back To Login
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
export default Register;
