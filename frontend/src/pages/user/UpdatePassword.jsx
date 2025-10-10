import React from 'react'
import { TextField, Button, Input } from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { GrUpdate } from "react-icons/gr";
import { ArrowBack } from '@mui/icons-material';
import useGeneral from "../user/hooks/useGeneral";

const UpdatePassword = () => {
  const initialState = {
    password: "",
  };
  const validationSchema = Yup.object({
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
   })

  const submitHandler = (values) => {
    console.log(values);
    navigate("/");
  };
  const { navigate } = useGeneral();

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
              <div className="row ">
                <div className="col auth_header">
                  <GrUpdate />
                  <p>Update Password</p>
                  <span>update your account password</span>
                </div>
                <div className="col">
                  <TextField
                    name="password"
                    type="text"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                    size="small"
                    label="new password"
                  />
                </div>
                <div className="col">
                    <Button type='submit' variant='contained' fullWidth>Update</Button>
                </div>
                <div className="col">
                    <Button onClick={()=> navigate("/login")} variant= "outlined" startIcon={<ArrowBack/>} fullWidth>
                        Back to Login
                    </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdatePassword
