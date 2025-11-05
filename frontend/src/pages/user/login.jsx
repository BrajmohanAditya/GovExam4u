import React, { useState } from "react";
import "./auth.css";
import { IoIosLogIn } from "react-icons/io";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import useGeneral from "../user/hooks/useGeneral";
import apis from "./utils/apisUsers";
import httpAction from "../user/utils/httpAction";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const { navigate } = useGeneral();
  const visibleHandler = () => {
    setVisible(!visible);
  };

  const initialState = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const submitHandler = async (values) => {
    const data = {
      url: apis().loginUser,
      method: "POST",
      body: values,
    };
    const result = await httpAction(data);
    if (result?.status) {
      navigate("/");
    }
  };

  const loginWithGoogle = () => {
    // isko continue with google button me lagana hai
    // window.open("https://govexam4ubackend.onrender.com/auth/google", "_self");
    window.open("http://localhost:8080/auth/google", "_self");
  };
  return (
    <div className="auth_card">
      <Formik
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        initialValues={initialState}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <div className="container_flex">
              <div className="row">
                <div className="auth_header">
                  <IoIosLogIn />
                  <p>welcome back</p>
                  <span>Login to continue</span>
                </div>

                {/* Google login button */}
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
                    name="email"
                    label="Email"
                    fullWidth
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
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
                    name="password"
                    label="Password"
                    type={visible ? "text" : "password"}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </div>

                <div className="col">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Login
                  </Button>
                </div>

                <div className="col">
                  <Button
                    startIcon={<ArrowBack />}
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate("/register")}
                  >
                    Create new account
                  </Button>
                </div>
                <div className="col">
                  <Button
                    onClick={() => navigate("/password/forgot")}
                    variant="text"
                    color="error"
                    fullWidth
                  >
                    Forgot password?
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

export default Login;
