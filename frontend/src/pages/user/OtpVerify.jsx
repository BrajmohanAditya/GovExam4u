import React, { useEffect } from "react";
import { TextField, Button, Input } from "@mui/material";
import { ArrowBack, Send } from "@mui/icons-material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { MdOutlineVerified } from "react-icons/md";
import "./auth.css";
import Countdown from "react-countdown";
import useGeneral from "../user/hooks/useGeneral";
import apis from "./utils/apisUsers";
import httpAction from "../user/utils/httpAction";
import { toast } from "react-hot-toast";

const OtpVerify = () => {
  const [timer, setTimer] = React.useState(5*60*1000);
  const initialState = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };
  const { navigate } = useGeneral();

  const validationSchema = Yup.object().shape({
    otp1: Yup.string().required(""),
    otp2: Yup.string().required(""),
    otp3: Yup.string().required(""),
    otp4: Yup.string().required(""),
    otp5: Yup.string().required(""),
    otp6: Yup.string().required(""),
  });
  const submitHandler = async (values) => {
    const otp =
      values.otp1 +
      values.otp2 +
      values.otp3 +
      values.otp4 +
      values.otp5 +
      values.otp6;
    const data = {
      url: apis().verifyOtp,
      method: "POST",
      body: { otp: otp },
    };
    const result = await httpAction(data);

    if (result?.success) {
      toast.success(result?.message);
      navigate("/passwordReset");
    }
  };

  const otpArray = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];

  const inputChange = (value, setFieldValue, index, item) => {
    setFieldValue(item, value);
    if (index > 0 && index < 6) {
      const element = document.getElementById(index + 1);
      element.focus();
    }
  };
    const getTimer = async () => {
      const data = {
        url: apis().getTime,
        method: "POST",
        body: { email: localStorage.getItem("email") },
      };
      const result = await httpAction(data);
      if (result?.status) {
        const minuts = result?.time - new Date().getTime();
        setTimer(minuts);
        console.log("otp time", result?.time);
      }
    };
  useEffect(() => {

    getTimer();
  }, []);

  const resendOtp = async () => {
    const data = {
      url: apis().forgotPassword, 
      method: "POST",
      body: { email: localStorage.getItem("email") },
    };
    const result = await httpAction(data);

    if (result?.status) {
      getTimer();
      console.log("resend otp time", result?.time);
    }
  };

  return (
    <div className="auth_card">
      <Formik
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        initialValues={initialState}
      >
        {({ handleBlur, values, touched, errors, setFieldValue }) => (
          <Form>
            <div className="container_flex">
              <div className="row">
                <div className="col auth_header">
                  <MdOutlineVerified />
                  <p>verify otp</p>
                  <span>Enter otp</span>
                </div>

                <div className="col otp_inputs">
                  {otpArray.map((item, index) => (
                    <TextField
                      type="text "
                      name={item}
                      value={values[item]}
                      onChange={(event) => {
                        const value = event.target.value.replace(
                          /[^0-9]/g,
                          " "
                        );
                        inputChange(value, setFieldValue, index + 1, item);
                      }}
                      inputProps={{ maxLength: 1, pattern: "[0-9]*" }}
                      id={index + 1}
                      size="small"
                      fullWidth
                      onBlur={handleBlur}
                      error={touched[item] && Boolean(errors[item])}
                    />
                  ))}
                </div>

                <div className="col">
                  <Button
                    disabled={Object.values(values).some(
                      (value) => value === ""
                    )}
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    verify
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

                {
                  <Countdown
                    renderer={({ minutes, seconds, completed }) => {
                      if (completed) {
                        return (
                          <div style={{ textAlign: "left" }}>
                            <Button onClick={resendOtp} variant="text">Resend</Button>
                          </div>
                        );
                      } else {
                        return (
                          <span>
                            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                          </span>
                        );
                      }
                    }}
                    date={new Date().getTime() + timer}
                  />
                }
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OtpVerify;
